export interface CsvAsJson {
  options?: Json2CsvOptions
  data: object[]
}

export interface Json2CsvOptions {
  fields?: string[]
  delimiter?: string
  quote?: string
  header?: boolean
}
