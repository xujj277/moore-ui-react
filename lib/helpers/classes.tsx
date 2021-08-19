function classes (...names:(string|undefined)[]) {
  return names.filter(Boolean).join(' ');
}

export default classes;

interface Object {
  extra: string | undefined
}

interface ClassToggles {
  [K: string]: boolean
}

function scopedClassMaker(prefix: string) {
  
  return function (name: string | ClassToggles, options?: Object) {
    const nameObject = (typeof name === 'string' || name === undefined) ? {[name]: name} : name
    
    const scoped = Object.entries(nameObject)
      .filter(kv => kv[1] !== false)
      .map(v => v[0])
      .map(v => [prefix, v].filter(Boolean).join('-'))
      .join(' ')
    
    if (options && options.extra) {
      return [scoped, options && options.extra].filter(Boolean).join(' ')
    } else {
      return scoped
    }
  }
}

export { scopedClassMaker };
