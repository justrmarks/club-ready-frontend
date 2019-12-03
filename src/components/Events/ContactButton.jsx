//// component to handle fetches for event attendance 
import React from 'react'
import { Button, Icon } from 'semantic-ui-react'




// props = { event, }
const ContactButton = ( {host} ) => {

    return (<a href={`mailto:${host.email}`}>
        <Button icon>
        <Icon name='envelope outline' />
             Contact host</Button>
    </a>

    )

}



export default ContactButton;