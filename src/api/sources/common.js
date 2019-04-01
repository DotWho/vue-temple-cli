import Fetch from '@/utils/fetch'

export default {
    userLogin: data => {
        return Fetch.post('/login', data)
    }
}
