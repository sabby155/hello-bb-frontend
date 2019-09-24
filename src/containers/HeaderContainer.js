import React from 'react'
import '../assets/Header.css'
import Navbar from '../components/Navbar'
import { Image } from 'semantic-ui-react'
import Bear from '../assets/header-bear.png'

class Header extends React.Component {
  
    render() {
       return (
        <div>   
        <header className="hero"> 
            <div className="center-content">
                <Image src={Bear} width="230" height="215"/>
                <h1><span className="hello">Hello</span><span className="bb">BB</span></h1>
            </div>
             
        </header>
         < Navbar logOut={this.props.logOut}/>
        </div>
       )
    }
}

export default Header