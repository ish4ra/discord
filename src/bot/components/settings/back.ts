import { ReplyableComponentInteraction } from '../../../cordo/types/ibase'


export default function (i: ReplyableComponentInteraction) {
  i.edit({
    title: 'hi'
  })
}
