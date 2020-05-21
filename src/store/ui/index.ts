import { UiContainer } from './config'
import { Types } from './type'
import { UiServices } from './services'
const UI = UiContainer.get<UiServices>(Types.UiInterface)
export {
  UI
}