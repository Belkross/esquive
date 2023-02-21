export function replaceDiacriticals(string: string) {
  let output = string
  const regexA = /[àáâä]/gi
  const regexE = /[èéêë]/gi
  const regexI = /[ìíîï]/gi
  const regexO = /[òóôö]/gi
  const regexU = /[ùúûü]/gi
  const regexY = /[ýÿŷỳ]/gi
  const regexOE = /œ/gi
  const regexAE = /æ/gi
  const regexC = /ç/gi
  output = output.replace(regexA, "a")
  output = output.replace(regexE, "e")
  output = output.replace(regexI, "i")
  output = output.replace(regexO, "o")
  output = output.replace(regexU, "u")
  output = output.replace(regexY, "y")
  output = output.replace(regexC, "c")
  output = output.replace(regexAE, "ae")
  output = output.replace(regexOE, "oe")

  return output
}
