export class UpdateUserboardDTO {
  readonly blocks: {
    name: {type: String, required: true},
    lg: {type: Object, default: {x: 1, y: 1, w: 1, h: 1}},
    md: {type: Object, default: {x: 1, y: 1, w: 1, h: 1}},
    sm: {type: Object, default: {x: 1, y: 1, w: 1, h: 1}},
    xs: {type: Object, default: {x: 1, y: 1, w: 1, h: 1}}
  }[];
}