// Advanced Gesture Controls System - Next-Generation
// Sophisticated gesture recognition for premium user interactions

export interface GestureEvent {
  type: 'swipe' | 'pinch' | 'rotate' | 'longpress' | 'doubletap' | 'shake' | 'tilt' | 'voice';
  direction?: 'up' | 'down' | 'left' | 'right';
  intensity: number;
  duration: number;
  timestamp: Date;
  position?: { x: number; y: number };
  delta?: { x: number; y: number };
  metadata?: any;
}

export interface GestureConfig {
  swipeThreshold: number;
  swipeVelocity: number;
  pinchThreshold: number;
  rotateThreshold: number;
  longpressDelay: number;
  doubletapDelay: number;
  shakeThreshold: number;
  tiltThreshold: number;
  voiceThreshold: number;
}

export interface GestureHandler {
  id: string;
  gesture: GestureEvent['type'];
  handler: (event: GestureEvent) => void;
  priority: number;
  enabled: boolean;
  context?: string;
}

export class AdvancedGestureController {
  private readonly DEFAULT_CONFIG: GestureConfig = {
    swipeThreshold: 50,
    swipeVelocity: 0.3,
    pinchThreshold: 0.1,
    rotateThreshold: 15,
    longpressDelay: 500,
    doubletapDelay: 300,
    shakeThreshold: 15,
    tiltThreshold: 10,
    voiceThreshold: 0.7
  };

  private config: GestureConfig;
  private handlers: Map<string, GestureHandler> = new Map();
  private isListening = false;
  private touchStartTime = 0;
  private touchStartPosition: { x: number; y: number } | null = null;
  private lastTouchTime = 0;
  private touchCount = 0;
  private longpressTimer: NodeJS.Timeout | null = null;
  private accelerometerData: { x: number; y: number; z: number }[] = [];
  private gyroscopeData: { x: number; y: number; z: number }[] = [];

  constructor(config?: Partial<GestureConfig>) {
    this.config = { ...this.DEFAULT_CONFIG, ...config };
    this.initializeSensors();
  }

  /**
   * Register gesture handler
   */
  registerHandler(
    id: string,
    gesture: GestureEvent['type'],
    handler: (event: GestureEvent) => void,
    priority: number = 0,
    context?: string
  ): void {
    this.handlers.set(id, {
      id,
      gesture,
      handler,
      priority,
      enabled: true,
      context
    });
  }

  /**
   * Unregister gesture handler
   */
  unregisterHandler(id: string): void {
    this.handlers.delete(id);
  }

  /**
   * Start gesture recognition
   */
  startListening(element: HTMLElement): void {
    if (this.isListening) return;

    this.isListening = true;
    this.attachEventListeners(element);
    this.startSensorMonitoring();
  }

  /**
   * Stop gesture recognition
   */
  stopListening(): void {
    if (!this.isListening) return;

    this.isListening = false;
    this.removeEventListeners();
    this.stopSensorMonitoring();
  }

  /**
   * Update gesture configuration
   */
  updateConfig(newConfig: Partial<GestureConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  /**
   * Get current configuration
   */
  getConfig(): GestureConfig {
    return { ...this.config };
  }

  /**
   * Enable/disable specific gesture type
   */
  setGestureEnabled(gesture: GestureEvent['type'], enabled: boolean): void {
    this.handlers.forEach(handler => {
      if (handler.gesture === gesture) {
        handler.enabled = enabled;
      }
    });
  }

  /**
   * Get gesture statistics
   */
  getGestureStats(): Record<string, number> {
    const stats: Record<string, number> = {};
    this.handlers.forEach(handler => {
      stats[handler.gesture] = (stats[handler.gesture] || 0) + 1;
    });
    return stats;
  }

  // Private methods
  private initializeSensors(): void {
    if (typeof window !== 'undefined') {
      // Request accelerometer permission
      if ('DeviceMotionEvent' in window) {
        this.requestSensorPermission();
      }
    }
  }

  private requestSensorPermission(): void {
    if ('DeviceMotionEvent' in window && typeof (DeviceMotionEvent as any).requestPermission === 'function') {
      (DeviceMotionEvent as any).requestPermission()
        .then((response: string) => {
          if (response === 'granted') {
            this.startSensorMonitoring();
          }
        })
        .catch((error: any) => {
          console.warn('Sensor permission denied:', error);
        });
    }
  }

  private attachEventListeners(element: HTMLElement): void {
    // Touch events
    element.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: false });
    element.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: false });
    element.addEventListener('touchend', this.handleTouchEnd.bind(this), { passive: false });
    element.addEventListener('touchcancel', this.handleTouchCancel.bind(this), { passive: false });

    // Mouse events (for desktop)
    element.addEventListener('mousedown', this.handleMouseDown.bind(this), { passive: false });
    element.addEventListener('mousemove', this.handleMouseMove.bind(this), { passive: false });
    element.addEventListener('mouseup', this.handleMouseUp.bind(this), { passive: false });

    // Wheel events (for scroll gestures)
    element.addEventListener('wheel', this.handleWheel.bind(this), { passive: false });

    // Keyboard events
    element.addEventListener('keydown', this.handleKeyDown.bind(this), { passive: false });
  }

  private removeEventListeners(): void {
    // Remove all event listeners
    document.removeEventListener('touchstart', this.handleTouchStart.bind(this));
    document.removeEventListener('touchmove', this.handleTouchMove.bind(this));
    document.removeEventListener('touchend', this.handleTouchEnd.bind(this));
    document.removeEventListener('touchcancel', this.handleTouchCancel.bind(this));
    document.removeEventListener('mousedown', this.handleMouseDown.bind(this));
    document.removeEventListener('mousemove', this.handleMouseMove.bind(this));
    document.removeEventListener('mouseup', this.handleMouseUp.bind(this));
    document.removeEventListener('wheel', this.handleWheel.bind(this));
    document.removeEventListener('keydown', this.handleKeyDown.bind(this));
  }

  private handleTouchStart(event: TouchEvent): void {
    event.preventDefault();
    
    const touch = event.touches[0];
    this.touchStartTime = Date.now();
    this.touchStartPosition = { x: touch.clientX, y: touch.clientY };
    
    // Handle double tap
    const now = Date.now();
    if (now - this.lastTouchTime < this.config.doubletapDelay) {
      this.touchCount++;
      if (this.touchCount === 2) {
        this.triggerGesture({
          type: 'doubletap',
          intensity: 1.0,
          duration: now - this.lastTouchTime,
          timestamp: new Date(),
          position: this.touchStartPosition
        });
        this.touchCount = 0;
      }
    } else {
      this.touchCount = 1;
    }
    this.lastTouchTime = now;

    // Start long press timer
    this.longpressTimer = setTimeout(() => {
      this.triggerGesture({
        type: 'longpress',
        intensity: 1.0,
        duration: this.config.longpressDelay,
        timestamp: new Date(),
        position: this.touchStartPosition
      });
    }, this.config.longpressDelay);
  }

  private handleTouchMove(event: TouchEvent): void {
    event.preventDefault();
    
    if (this.longpressTimer) {
      clearTimeout(this.longpressTimer);
      this.longpressTimer = null;
    }

    if (event.touches.length === 1) {
      // Single finger swipe
      this.handleSingleTouchMove(event);
    } else if (event.touches.length === 2) {
      // Two finger gestures (pinch, rotate)
      this.handleMultiTouchMove(event);
    }
  }

  private handleTouchEnd(event: TouchEvent): void {
    event.preventDefault();
    
    if (this.longpressTimer) {
      clearTimeout(this.longpressTimer);
      this.longpressTimer = null;
    }

    if (this.touchStartPosition && event.changedTouches.length === 1) {
      const touch = event.changedTouches[0];
      const deltaX = touch.clientX - this.touchStartPosition.x;
      const deltaY = touch.clientY - this.touchStartPosition.y;
      const duration = Date.now() - this.touchStartTime;
      
      // Calculate swipe
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const velocity = distance / duration;
      
      if (distance > this.config.swipeThreshold && velocity > this.config.swipeVelocity) {
        const direction = this.getSwipeDirection(deltaX, deltaY);
        this.triggerGesture({
          type: 'swipe',
          direction,
          intensity: Math.min(1.0, distance / 200),
          duration,
          timestamp: new Date(),
          position: this.touchStartPosition,
          delta: { x: deltaX, y: deltaY }
        });
      }
    }
  }

  private handleTouchCancel(event: TouchEvent): void {
    event.preventDefault();
    this.touchStartPosition = null;
    if (this.longpressTimer) {
      clearTimeout(this.longpressTimer);
      this.longpressTimer = null;
    }
  }

  private handleMouseDown(event: MouseEvent): void {
    this.touchStartTime = Date.now();
    this.touchStartPosition = { x: event.clientX, y: event.clientY };
  }

  private handleMouseMove(event: MouseEvent): void {
    // Handle mouse drag gestures
    if (this.touchStartPosition && event.buttons === 1) {
      const deltaX = event.clientX - this.touchStartPosition.x;
      const deltaY = event.clientY - this.touchStartPosition.y;
      
      if (Math.abs(deltaX) > 10 || Math.abs(deltaY) > 10) {
        // Mouse drag gesture
        const direction = this.getSwipeDirection(deltaX, deltaY);
        this.triggerGesture({
          type: 'swipe',
          direction,
          intensity: 0.5,
          duration: Date.now() - this.touchStartTime,
          timestamp: new Date(),
          position: this.touchStartPosition,
          delta: { x: deltaX, y: deltaY }
        });
      }
    }
  }

  private handleMouseUp(event: MouseEvent): void {
    this.touchStartPosition = null;
  }

  private handleWheel(event: WheelEvent): void {
    event.preventDefault();
    
    const direction = event.deltaY > 0 ? 'down' : 'up';
    this.triggerGesture({
      type: 'swipe',
      direction,
      intensity: Math.min(1.0, Math.abs(event.deltaY) / 100),
      duration: 0,
      timestamp: new Date(),
      position: { x: event.clientX, y: event.clientY },
      delta: { x: 0, y: event.deltaY }
    });
  }

  private handleKeyDown(event: KeyboardEvent): void {
    // Handle keyboard shortcuts as gestures
    const key = event.key.toLowerCase();
    let direction: 'up' | 'down' | 'left' | 'right' | undefined;
    
    switch (key) {
      case 'arrowup':
        direction = 'up';
        break;
      case 'arrowdown':
        direction = 'down';
        break;
      case 'arrowleft':
        direction = 'left';
        break;
      case 'arrowright':
        direction = 'right';
        break;
      case ' ':
        // Spacebar for like action
        this.triggerGesture({
          type: 'swipe',
          direction: 'right',
          intensity: 1.0,
          duration: 0,
          timestamp: new Date()
        });
        return;
      case 'escape':
        // Escape for pass action
        this.triggerGesture({
          type: 'swipe',
          direction: 'left',
          intensity: 1.0,
          duration: 0,
          timestamp: new Date()
        });
        return;
    }
    
    if (direction) {
      this.triggerGesture({
        type: 'swipe',
        direction,
        intensity: 1.0,
        duration: 0,
        timestamp: new Date()
      });
    }
  }

  private handleSingleTouchMove(event: TouchEvent): void {
    // Single touch move handling
    if (this.touchStartPosition) {
      const touch = event.touches[0];
      const deltaX = touch.clientX - this.touchStartPosition.x;
      const deltaY = touch.clientY - this.touchStartPosition.y;
      
      // Real-time swipe feedback
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      if (distance > 20) {
        const direction = this.getSwipeDirection(deltaX, deltaY);
        this.triggerGesture({
          type: 'swipe',
          direction,
          intensity: Math.min(1.0, distance / 200),
          duration: Date.now() - this.touchStartTime,
          timestamp: new Date(),
          position: this.touchStartPosition,
          delta: { x: deltaX, y: deltaY }
        });
      }
    }
  }

  private handleMultiTouchMove(event: TouchEvent): void {
    if (event.touches.length === 2) {
      const touch1 = event.touches[0];
      const touch2 = event.touches[1];
      
      const distance = Math.sqrt(
        Math.pow(touch2.clientX - touch1.clientX, 2) +
        Math.pow(touch2.clientY - touch1.clientY, 2)
      );
      
      // Pinch gesture
      if (distance > this.config.pinchThreshold) {
        this.triggerGesture({
          type: 'pinch',
          intensity: distance / 500,
          duration: Date.now() - this.touchStartTime,
          timestamp: new Date(),
          position: {
            x: (touch1.clientX + touch2.clientX) / 2,
            y: (touch1.clientY + touch2.clientY) / 2
          },
          metadata: { distance }
        });
      }
      
      // Rotate gesture
      const angle = Math.atan2(
        touch2.clientY - touch1.clientY,
        touch2.clientX - touch1.clientX
      );
      
      if (Math.abs(angle) > this.config.rotateThreshold) {
        this.triggerGesture({
          type: 'rotate',
          intensity: Math.abs(angle) / Math.PI,
          duration: Date.now() - this.touchStartTime,
          timestamp: new Date(),
          position: {
            x: (touch1.clientX + touch2.clientX) / 2,
            y: (touch1.clientY + touch2.clientY) / 2
          },
          metadata: { angle }
        });
      }
    }
  }

  private startSensorMonitoring(): void {
    if (typeof window !== 'undefined') {
      // Accelerometer for shake detection
      window.addEventListener('devicemotion', this.handleDeviceMotion.bind(this));
      
      // Gyroscope for tilt detection
      window.addEventListener('deviceorientation', this.handleDeviceOrientation.bind(this));
    }
  }

  private stopSensorMonitoring(): void {
    if (typeof window !== 'undefined') {
      window.removeEventListener('devicemotion', this.handleDeviceMotion.bind(this));
      window.removeEventListener('deviceorientation', this.handleDeviceOrientation.bind(this));
    }
  }

  private handleDeviceMotion(event: DeviceMotionEvent): void {
    if (event.acceleration) {
      const { x, y, z } = event.acceleration;
      this.accelerometerData.push({ x: x || 0, y: y || 0, z: z || 0 });
      
      // Keep only recent data
      if (this.accelerometerData.length > 10) {
        this.accelerometerData.shift();
      }
      
      // Detect shake
      if (this.accelerometerData.length >= 3) {
        const recent = this.accelerometerData.slice(-3);
        const totalAcceleration = recent.reduce((sum, acc) => {
          return sum + Math.sqrt(acc.x * acc.x + acc.y * acc.y + acc.z * acc.z);
        }, 0);
        
        if (totalAcceleration > this.config.shakeThreshold) {
          this.triggerGesture({
            type: 'shake',
            intensity: Math.min(1.0, totalAcceleration / 50),
            duration: 0,
            timestamp: new Date()
          });
        }
      }
    }
  }

  private handleDeviceOrientation(event: DeviceOrientationEvent): void {
    if (event.beta !== null && event.gamma !== null) {
      this.gyroscopeData.push({ x: event.beta, y: event.gamma, z: event.alpha || 0 });
      
      // Keep only recent data
      if (this.gyroscopeData.length > 5) {
        this.gyroscopeData.shift();
      }
      
      // Detect tilt
      if (this.gyroscopeData.length >= 2) {
        const current = this.gyroscopeData[this.gyroscopeData.length - 1];
        const previous = this.gyroscopeData[this.gyroscopeData.length - 2];
        
        const tiltChange = Math.abs(current.x - previous.x) + Math.abs(current.y - previous.y);
        
        if (tiltChange > this.config.tiltThreshold) {
          this.triggerGesture({
            type: 'tilt',
            intensity: Math.min(1.0, tiltChange / 30),
            duration: 0,
            timestamp: new Date(),
            metadata: { beta: current.x, gamma: current.y }
          });
        }
      }
    }
  }

  private getSwipeDirection(deltaX: number, deltaY: number): 'up' | 'down' | 'left' | 'right' {
    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);
    
    if (absX > absY) {
      return deltaX > 0 ? 'right' : 'left';
    } else {
      return deltaY > 0 ? 'down' : 'up';
    }
  }

  private triggerGesture(event: GestureEvent): void {
    const handlers = Array.from(this.handlers.values())
      .filter(handler => 
        handler.gesture === event.type && 
        handler.enabled
      )
      .sort((a, b) => b.priority - a.priority);
    
    handlers.forEach(handler => {
      try {
        handler.handler(event);
      } catch (error) {
        console.error('Gesture handler error:', error);
      }
    });
  }
}

// React hook for gesture controls
export function useGestureControls(
  elementRef: React.RefObject<HTMLElement>,
  config?: Partial<GestureConfig>
) {
  const controllerRef = React.useRef<AdvancedGestureController | null>(null);

  React.useEffect(() => {
    if (elementRef.current) {
      controllerRef.current = new AdvancedGestureController(config);
      controllerRef.current.startListening(elementRef.current);
    }

    return () => {
      if (controllerRef.current) {
        controllerRef.current.stopListening();
      }
    };
  }, [elementRef, config]);

  const registerHandler = React.useCallback((
    id: string,
    gesture: GestureEvent['type'],
    handler: (event: GestureEvent) => void,
    priority?: number,
    context?: string
  ) => {
    if (controllerRef.current) {
      controllerRef.current.registerHandler(id, gesture, handler, priority, context);
    }
  }, []);

  const unregisterHandler = React.useCallback((id: string) => {
    if (controllerRef.current) {
      controllerRef.current.unregisterHandler(id);
    }
  }, []);

  const setGestureEnabled = React.useCallback((gesture: GestureEvent['type'], enabled: boolean) => {
    if (controllerRef.current) {
      controllerRef.current.setGestureEnabled(gesture, enabled);
    }
  }, []);

  const updateConfig = React.useCallback((newConfig: Partial<GestureConfig>) => {
    if (controllerRef.current) {
      controllerRef.current.updateConfig(newConfig);
    }
  }, []);

  return {
    registerHandler,
    unregisterHandler,
    setGestureEnabled,
    updateConfig,
    getConfig: () => controllerRef.current?.getConfig(),
    getStats: () => controllerRef.current?.getGestureStats()
  };
}

// Global gesture controller instance
export const gestureController = new AdvancedGestureController();
