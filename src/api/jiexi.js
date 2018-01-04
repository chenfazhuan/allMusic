export function xiami_change(d) {
  let data = d;
  let i = parseInt(data.substring(0, 1))
  let b = i + 1
  let data1 = data.substring(1)
  let l = parseInt(data1.length)
  let a = Math.ceil(l / i)
  let result = []
  let c = a * i - l
  let q = 1
  for (q; q < b - c; q++) {
    result.push(data1.substring(a * (q - 1), a * q))
  }
  let data2 = data1.substring(a * (q - 1))
  let a1 = Math.floor(data2.length / (i - (q - 1)))
  let i2 = i - (q - 1)
  for (let c = 1; c < (i2 + 1); c++) {
    result.push(data2.substring(a1 * (c - 1), a1 * c))
  }
  let r = ''
  let r1 = ''
  for (let y = 0; y < a; y++) {
    let aa = ''
    for (let k = 0; k < result.length; k++) {
      if (!result[k][y]) {
        break
      }
      else {
        aa += result[k][y]
      }
    }
    r += aa
  }
  r1 = decodeURIComponent(r)
  r1 = r1.replace(/\^/g, '0')
  return r1
}

