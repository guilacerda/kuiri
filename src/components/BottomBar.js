import React, { Component } from 'react';
import './BottomBar.css';
import { FiPlusSquare } from 'react-icons/fi'
import { MdPerson, MdPersonOutline } from 'react-icons/md'
import { AiFillHome, AiOutlineHome, AiOutlineSearch } from 'react-icons/ai'

class BottomBar extends Component {
  render() {
    return (
      <div class="main-container">
        <AiOutlineHome size="32px" color="red" />
        <AiOutlineSearch size="32px" color="red" />
        <FiPlusSquare size="30px" color="red" />
        <MdPersonOutline size="37px" color="red"/>
      </div>
    );
  }
}

export default BottomBar
