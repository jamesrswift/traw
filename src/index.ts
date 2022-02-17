import BaseRequestor from './tier1/baseRequestor'

const r = new BaseRequestor({
    client_id: '9wkmmc_voASdYsOlpVcEtg',
    user_agent: 'TRAW:9wkmmc_voASdYsOlpVcEtg:v0.0.1dev (by /u/Mr_DJA)'
})

r.get({ url: '/api/v1/me' }).then(res => console.log(res.data)).catch(console.error)
