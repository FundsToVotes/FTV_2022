export async function test() {
  let x = await fetch("https://api.fundstovote.com/v1/addressRepresentative?address=wa")
  return x.json()
}