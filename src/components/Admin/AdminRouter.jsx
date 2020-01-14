import React from 'react'
import { Route } from 'react-router-dom'

const AdminRouter = (props) => {


    return(<>
        <Route path="/admin/users"><h2>Showing all users</h2></Route>
        <Route path="/admin/reports"><h2>Showing all reports</h2></Route>
        </>
    )
}

export default AdminRouter