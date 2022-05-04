import picgo from '@core/picgo'

const getPicBeds = () => {
  const picBedTypes = picgo.helper.uploader.getIdList()
  const picBedFromDB = picgo.getConfig<IPicBedType[]>('picBed.list') || []
  const picBeds = picBedTypes.map((item: string) => {
    const visible = picBedFromDB.find((i: IPicBedType) => i.type === item) // object or undefined
    return {
      type: item,
      name: picgo.helper.uploader.get(item)!.name || item,
      visible: visible ? visible.visible : true
    }
  }) as IPicBedType[]
  return picBeds.filter(v => (v.type === 'github' || v.type === 'gitlab'))
}

export default getPicBeds
