import React, { useState } from 'react'
import Map from '../taxpayer-components/map'
import ApplyForm from '../taxpayer-components/applyForm'
import Toaster from '../../components/toaster'
import { userStore } from '../../stores/UserStore'
import { appStore } from '../../stores/AppStore'


const TP_application = () => {
    const sendingStatus = appStore((state) => state.sendingStatus)
    const sendingMessage = appStore((state) => state.sendingMessage)

    return (
        <div className='__application-wrapper'>
            <div className='aside-tp'>
                <div className='__instructions-wrapper'>
                    <h1>Application Form</h1>
                    <dl>
                        <dt> <h3>Instructions:</h3></dt>
                        <dd>
                            1. Please send one application per property.
                        </dd>

                        <dd>
                            2. Please check your receipt and input the required details below.
                        </dd>
                        <dd>
                            3. You should put the exact tax declaration number, owner name, address, classification and assessed value of the property else we will reject your application.
                        </dd>
                        <dd>
                            4. Find the property location in the map to fill the coordinates of your property. Please be sure to select the correct location of your property.
                        </dd>
                        <dd>
                            5. Please upload the image of your last payment receipt so we can verify that this is your property. The system only accepts 5mb or below with .jpg, .png, and .pdf file extensions.
                        </dd>
                        <dd>
                            6. Once your application is approved, you will be able to process payments online.
                        </dd>
                        <dd>
                            7. Note that all fields are required.
                        </dd>
                    </dl>
                </div>
                <ApplyForm  />

            </div>
            <div className='map-wrapper'>
                <Map />
            </div>
            {sendingMessage && sendingStatus ? <Toaster message={sendingMessage} status={sendingStatus}/> : ''}     
          
        </div>
    )
}

export default TP_application