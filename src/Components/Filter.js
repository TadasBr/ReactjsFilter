import React, {useState} from 'react'
import styled from 'styled-components'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faChevronDown, faTimes} from "@fortawesome/free-solid-svg-icons"
import image from "../Images/car.png"
import useForceUpdate from "use-force-update";
import OutsideClickHandler from "react-outside-click-handler"

const Wrapper = styled.div`
    height: 100px;
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .buttons{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }
    .button{
        padding: 4px 8px;
        margin-bottom: 16px;
        height: 60px;
        min-width: 75px;
        align-items: center;
        display: flex;
        flex-direction: column;
        color: #192024;
        background-color: #fff;
        border: 1px solid #9ba8b0;
        border-radius: 4px;
        font-family: HelveticaNeue;
        margin: 0px 5px 0px 5px;
        font-weight: bold;
        font-weight: 700;
        line-height: 18px;
        font-size: 12px;
        align-items: center;
        justify-content: center;
    }
    .type{
        height: 16px;
        width: 51px;
        font-size: 13px;
        font-weight: bold;
        line-weight: 16px;
    }
    .price{
        height: 14px;
        width: 34px;
        font-size: 12px;
        line-height: 14px;
        margin-top: 3px;
    }
    .buttonImage{
        width: 48px;
        height: 32px;
    }
    .active{
        background-color: #363f45;
        color: #fff;
        border-color: #363f45;
    }
    .rotate {
        -webkit-transform: rotate(180deg);
        -moz-transform: rotate(180deg);
        -ms-transform: rotate(180deg);
        -o-transform: rotate(180deg);
        transform: rotate(180deg);
    }
    .more{
        display: flex;
        flex-direction: row;
        position: relative;
        wrap: nowrap;
    }
    .icon{
        margin-left: 10px;
    }
    .dropdown{
        width: 250px;
        padding-top: 10px;
        padding-bottom: 10px;
        box-shadow: 2px 2px 10px;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        display: block;
        position: absolute;
        left: 1030px;
        top: 412px;

    }
    .dropdownItem{
        width: 100%;
        height: 40px;
        display: flex;
        align-items: center;
        &:hover{
            background-color: #F3F5F7;
        }
    }
    .buttonImageDrop{
        min-width: 50px;
        height: 100%; 
    }
    .typeDrop{
        font-size: 13px;
        line-weight: 16px;
    }
    .dActive{
        display: none;
    }
    .closeIcon{
        margin-left: 10px;
        &:hover{
            color: red;
        }
    }
`

const Filter = () => {
    //state array
    const [active, setActive] = useState([{mode: false}, {mode: false}, {mode: false},
        {mode: false}, {mode: false}, {mode: false}, {mode: false}, {mode: false}, {mode: false}, {mode: false}]);

    //changes selected state
    const toggler = (index) => {
        let temp = active
        temp[index].mode = !temp[index].mode
        setActive(temp)
        allActive()
        forceUpdate()
    }
    //rerenders component
    const forceUpdate = useForceUpdate()
    //Changes style of div dependant if selected
    const isActive = (index) => (active[index].mode ? 'button active' : 'button')
    //If any selected, all unselected
    const isAnyActive = () => {
        for (const act of active)
            if (act.mode) return 'button'
        return 'button active'
    }
    //if checked marks as checked
    const isChecked = (index) => (active[index].mode ? true : false)

    //Rotates icon if div selected
    const rotate = (index) => (active[index].mode ? 'icon rotate' : 'icon')
    //Changes style of more button if selected or has any inside selected items
    const isMoreActive = (index) => {
        for (let i = 6; i < active.length; i++)
            if (active[i].mode)
                return "button more active"
        if (active[index].mode)
            return "button more active"
        else
            return "button more"
    }
    //if any selected in dropdown close button appears
    const isCloseActive = () => {
        for (let i = 6; i < active.length; i++)
            if (active[i].mode)
                return "closeIcon"
        return "dActive"
    }
    //on click deselects all dropdown checkboxes
    const onClickClose = () => {
        let temp = active;
        for (let i = 6; i < active.length; i++)
            temp[i].mode = false;
        setActive(temp);
        toggler(5);
    }
    //returns number of items selected under dropdown or nothing
    const selected = () => {
        let count = 0;
        for (let i = 6; i < active.length; i++)
            if (active[i].mode)
                count++;
        if (count > 0)
            return "Selected: " + count
        else
            return "";
    }
    //if every item selected all are unselected and all button active
    const allActive = () => {
        for (const act of active)
            if (!act.mode) return;
        let temp = active;
        for (const act of temp)
            act.mode = false;
        setActive(temp);
    }
    //If clicked opens dropdown
    const showDropdown = (index) => (active[index].mode ? 'dropdown' : "dropdown dActive")
    //If pressed on all, all others unselected
    const selectAll = () => {
        let temp = active
        for (const x of temp)
            x.mode = false
        setActive(temp)
        forceUpdate()
    }
    return (
        <Wrapper>
            <div className="buttons">
                <div onClick={() => selectAll()} className={isAnyActive()}>
                    <div className="type">All</div>
                </div>
                <div onClick={() => toggler(0)} className={isActive(0)}>
                    <img className="buttonImage" src={image}/>
                    <div className="type">Small</div>
                </div>
                <div onClick={() => toggler(1)} className={isActive(1)}>
                    <img className="buttonImage" src={image}/>
                    <div className="type">Medium</div>
                </div>
                <div onClick={() => toggler(2)} className={isActive(2)}>
                    <img className="buttonImage" src={image}/>
                    <div className="type">Large</div>
                </div>
                <div onClick={() => toggler(3)} className={isActive(3)}>
                    <img className="buttonImage" src={image}/>
                    <div className="type">SUV</div>
                </div>
                <div onClick={() => toggler(4)} className={isActive(4)}>
                    <img className="buttonImage" src={image}/>
                    <div className="type">Van</div>
                </div>
                <div onClick={() => toggler(5)} className={isMoreActive(5)}>
                    <div style={{display: "flex", flexDirection: "column"}}>
                        <div>
                            <div className="type">
                                More
                                <FontAwesomeIcon className={rotate(5)} icon={faChevronDown} size="xs"/>
                            </div>
                        </div>
                        <label>{selected()}</label>
                    </div>
                    <FontAwesomeIcon onClick={() => onClickClose()} icon={faTimes} className={isCloseActive()}
                                     size="lg"/>
                </div>
            </div>
            <OutsideClickHandler onOutsideClick={() => {
                if(active[5].mode)
                    toggler(5)
            }}>
                <div className={showDropdown(5)}>
                    <div className="dropdownItem" onClick={() => toggler(6)}>
                        <input type="checkbox" checked={isChecked(6)}/>
                        <img className="buttonImageDrop" src={image}/>
                        <div className="typeDrop">Pickup Truck</div>
                        <div className="price">594$</div>
                    </div>
                    <div className="dropdownItem" onClick={() => toggler(7)}>
                        <input type="checkbox" checked={isChecked(7)}/>
                        <img className="buttonImageDrop" src={image}/>
                        <div className="typeDrop">Luxury</div>
                        <div className="price">626$</div>
                    </div>
                    <div className="dropdownItem" onClick={() => toggler(8)}>
                        <input type="checkbox" checked={isChecked(8)}/>
                        <img className="buttonImageDrop" src={image}/>
                        <div className="typeDrop">Commercial</div>
                        <div className="price">1248$</div>
                    </div>
                    <div className="dropdownItem" onClick={() => toggler(9)}>
                        <input type="checkbox" checked={isChecked(9)}/>
                        <img className="buttonImageDrop" src={image}/>
                        <div className="typeDrop">Convertible</div>
                        <div className="price">1607$</div>
                    </div>
                </div>
            </OutsideClickHandler>
        </Wrapper>
    )
}

export default Filter;