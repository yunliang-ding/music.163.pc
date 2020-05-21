/**
  创建和配置 IOC
*/
import { Container } from "inversify"
import { MusicInterface, Types } from './type'
import { MusicServices } from "./services"
const MusicContainer = new Container({defaultScope: "Singleton"});
MusicContainer.bind<MusicInterface>(Types.MusicInterface).to(MusicServices)
export { MusicContainer }