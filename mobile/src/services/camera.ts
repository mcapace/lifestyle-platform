import { Camera, CameraType } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';

class CameraService {
  private static instance: CameraService;

  private constructor() {}

  static getInstance(): CameraService {
    if (!CameraService.instance) {
      CameraService.instance = new CameraService();
    }
    return CameraService.instance;
  }

  /**
   * Request camera permissions
   */
  async requestCameraPermission(): Promise<boolean> {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Camera Permission',
        'ELOURA needs camera access to take photos for your profile.'
      );
      return false;
    }
    return true;
  }

  /**
   * Request media library permissions
   */
  async requestMediaLibraryPermission(): Promise<boolean> {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Media Library Permission',
        'ELOURA needs access to your photos to upload images.'
      );
      return false;
    }
    return true;
  }

  /**
   * Take photo with camera
   */
  async takePhoto(): Promise<string | null> {
    const hasPermission = await this.requestCameraPermission();
    if (!hasPermission) return null;

    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 5],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        return result.assets[0].uri;
      }
      return null;
    } catch (error) {
      console.error('Camera error:', error);
      Alert.alert('Error', 'Failed to take photo');
      return null;
    }
  }

  /**
   * Pick image from gallery
   */
  async pickImage(multiple: boolean = false): Promise<string[]> {
    const hasPermission = await this.requestMediaLibraryPermission();
    if (!hasPermission) return [];

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: multiple,
        allowsEditing: !multiple,
        aspect: [4, 5],
        quality: 0.8,
        selectionLimit: multiple ? 6 : 1,
      });

      if (!result.canceled && result.assets) {
        return result.assets.map(asset => asset.uri);
      }
      return [];
    } catch (error) {
      console.error('Image picker error:', error);
      Alert.alert('Error', 'Failed to select images');
      return [];
    }
  }

  /**
   * Upload image to server
   */
  async uploadImage(uri: string, userId: string): Promise<string | null> {
    try {
      const formData = new FormData();
      formData.append('image', {
        uri,
        type: 'image/jpeg',
        name: `${userId}_${Date.now()}.jpg`,
      } as any);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.ok) {
        const data = await response.json();
        return data.url;
      }
      
      return null;
    } catch (error) {
      console.error('Upload error:', error);
      return null;
    }
  }
}

export default CameraService.getInstance();

