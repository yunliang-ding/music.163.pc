import { MusicContainer } from './config'
import { Types } from './type'
import { MusicServices } from './services'
const Music = MusicContainer.get<MusicServices>(Types.MusicInterface)
export {
  Music
}