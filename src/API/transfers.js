import {HTTP} from "./HTTP"

export const INIT_TRANSFER = async (transfer_details) => {
  let endpoint = encodeURI("/transfer-go/v1/send/initiate")

  const res = () => {
    return new Promise ((resolve, reject) => {
      HTTP.post(endpoint, transfer_details).then(response => {
        resolve(response.data)
      }).catch(err => {
        reject(err)
      })
    })
  }

  return await res()
}


export const VERIFY_LOCAL_CARD = async (details) => {
  let endpoint = encodeURI("/transfer-go/v1/send/cardauth/local")

  const res = () => {
    return new Promise ((resolve, reject) => {
      HTTP.post(endpoint, details).then(response => {
        resolve(response.data)
      }).catch(err => {
        reject(err)
      })
    })
  }

  return await res()
}


export const VERIFY_OTP = async (payload) => {
  let endpoint = encodeURI("/transfer-go/v1/send/validate_otp")

  const res = () => {
    return new Promise ((resolve, reject) => {
      HTTP.post(endpoint, payload).then(response => {
        resolve(response.data)
      }).catch(err => {
        reject(err)
      })
    })
  }

  return await res()
}


export const SEND_SMS = async (txref) => {
  let endpoint = encodeURI("/transfer-go/v1/send/smslink/".concat(txref))

  const res = () => {
    return new Promise ((resolve, reject) => {
      HTTP.post(endpoint).then(response => {
        resolve(response.data)
      }).catch(err => {
        reject(err)
      })
    })
  }

  return await res()
}

export const SEND_BILLING_INFO = async (billing_info) => {
  let endpoint = encodeURI("/transfer-go/v1/send/cardauth/international")

  const res = () => {
    return new Promise ((resolve, reject) => {
      HTTP.post(endpoint, billing_info).then(response => {
        resolve(response.data)
      }).catch(err => {
        reject(err)
      })
    })
  }

  return await res()
}
