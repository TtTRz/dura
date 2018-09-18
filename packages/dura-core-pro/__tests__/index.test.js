import {createDuraCorePro} from '../src/index'
import DuraImmer from 'dura-plugin-immer'
import DuraStatus from 'dura-plugin-status'

describe('dura-core-pro', function () {

    it('dd', function () {

        const defaultModel = {
            namespace: 'default',
            initialState: {
                name: '张三'
            },
            reducers: {
                onChangeName(state, action) {
                    console.log(action)
                    state.name = action?.payload?.name
                }
            },
            effects: {
                * onChangeName({put}, action) {
                    put({
                        type: 'default/reducers/onChangeName',
                        payload: action?.payload
                    })
                }
            }
        }, default2Model = {
            namespace: 'default2',
            initialState: {
                name: '张三2'
            }
        };

        const duraCorePro = createDuraCorePro({
            initialModels: [defaultModel],
            plugins: [DuraImmer, DuraStatus]
        })

        console.log(duraCorePro.reduxStore.getState())

        duraCorePro.reduxStore.dispatch({
            type: 'default/reducers/onChangeName',
            payload: {
                name: '李四'
            }
        })

        console.log(duraCorePro.reduxStore.getState())

    })
})