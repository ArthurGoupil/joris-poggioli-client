import {
  ApiImage,
  decodeApiImage,
  Image,
} from '../../../shared/domain/entities/image'

type ApiMaintenanceModeAcf = {
  is_on_maintenance: boolean
  background: ApiImage
}

export type ApiMaintenanceMode = {
  id: number
  acf: ApiMaintenanceModeAcf
}

export type MaintenanceMode = {
  id: number
  isOnMaintenance: boolean
  background: Image | null
}

export const decodeMaintenanceMode = (
  apiMaintenance: ApiMaintenanceMode
): MaintenanceMode => ({
  id: apiMaintenance.id,
  isOnMaintenance: apiMaintenance.acf.is_on_maintenance,
  background: decodeApiImage(apiMaintenance.acf.background),
})
