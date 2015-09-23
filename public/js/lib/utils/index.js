export function gettext(string){
  // Initial no-op gettext stand-in.
  return string;
}


export function genId({prefix=''} = {}) {
  return prefix + '_' + Math.random().toString(36).substr(2, 9);
}
