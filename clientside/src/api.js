export async function test() {
  let x = await fetch("http://localhost:3000/v1/addressRepresentative?address=wa")
  return x.json()
}