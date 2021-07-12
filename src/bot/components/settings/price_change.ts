import { Core } from '../../../index'
import { ReplyableComponentInteraction } from '../../../cordo/types/ibase'
import Const from '../../const'


export default async function (i: ReplyableComponentInteraction) {
  const val = i.data.values[0]
  if (!val) return i.ack()

  const price = Const.priceClasses[parseInt(val) || 0]

  const guild = await Core.guilds.fetch(i.guild_id)
  await Core.databaseManager.changeSetting(guild, i.guildData, 'price', price)
  i.state('settings_filter')
}
