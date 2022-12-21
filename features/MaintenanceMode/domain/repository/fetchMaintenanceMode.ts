import axios from 'axios'
import {
  ApiMaintenanceMode,
  decodeMaintenanceMode,
  MaintenanceMode,
} from '../entities/maintenanceMode'

export const fetchMaintenanceMode = async (): Promise<MaintenanceMode> => {
  try {
    const response = await axios.get<ApiMaintenanceMode>(
      `${process.env.WP_URL}/maintenance-mode/452?_fields=id,acf`
    )

    return decodeMaintenanceMode(response.data)
  } catch (error) {
    console.error('Maintenance mode', error)
    return {
      id: 0,
      isOnMaintenance: false,
      background: null,
    }
  }
}
