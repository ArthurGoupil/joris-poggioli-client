import {
  ApiImage,
  decodeApiImage,
  Image,
} from '../../../shared/domain/entities/image'

type ApiMaintenanceModeAcf = {
  is_on_maintenance: boolean
  background_desktop: ApiImage
  background_mobile: ApiImage
}

export type ApiMaintenanceMode = {
  id: number
  acf: ApiMaintenanceModeAcf
}

export type MaintenanceMode = {
  id: number
  isOnMaintenance: boolean
  backgroundDesktop: Image | null
  backgroundMobile: Image | null
}

export const decodeMaintenanceMode = (
  apiMaintenance: ApiMaintenanceMode
): MaintenanceMode => ({
  id: apiMaintenance.id,
  isOnMaintenance: apiMaintenance.acf.is_on_maintenance,
  backgroundDesktop: decodeApiImage(apiMaintenance.acf.background_desktop),
  backgroundMobile: decodeApiImage(apiMaintenance.acf.background_mobile),
})
