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
    const scoped = Object.entries(name instanceof Object ? name : {[name] : name})
      .filter(kv => kv[1] !== false)
      .map(v => v[0])
      .map(v => [prefix, v].filter(Boolean).join('-'))
      .concat(options && options.extra || [])
      .join(' ')
    
      return scoped
  }
}

export { scopedClassMaker };
