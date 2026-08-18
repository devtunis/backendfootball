import Sqids from 'sqids'


export const UUid = ()=>{

    const sqids = new Sqids({
    alphabet: 'FxnXM1kBN6cuhsAvjW3Co7l2RePyY8DwaU04Tzt9fHQrqSVKdpimLGIJOgb5ZE',
    })
    const id = sqids.encode([1, 2, 3, 4]) // "B4aajs"
    

    return id
}