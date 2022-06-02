import React from "react";
import reactDom from "react-dom";
import Head from 'next/head';
import Header from '@components/Header';
import Footer from '@components/Footer';
import {TRN} from "statisfy";
const DropDown = ({ selectedValue, disabled, options, onChange }) => {
  return (
    <select onChange={onChange} disabled={disabled}>
      {
        options.map(o => <option value={o} selected={o == selectedValue}>{o}</option>)
      }
    </select>
  );
}


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      options: ['Twitch', 'Spotify','Twitter', "Node Package Manager(npm)",'Fortnite',"Apex Legends"],
      platforms: ['PC',"Mobile","Xbox","PSN"],
      selectedNumber: '',
      user:'',
      selectedPlatform: '',
    }

    this.onOptionsChange = this.onOptionsChange.bind(this);
    this.onPlatformsChange = this.onPlatformsChange.bind(this);
    this.onUserChange = this.onUserChange.bind(this);
  }

  onOptionsChange(e) {
    this.setState({ selectedNumber: e.target.value });
    localStorage.setItem("option",e.target.value);
  }

  onPlatformsChange(e) {
    this.setState({ selectedPlatform: e.target.value });
    localStorage.setItem("Platform",e.target.value)
  }
  onUserChange(e) {
    this.setState({ user: e.target.value})
    localStorage.setItem("Username",e.target.value)
  }
  handleFormSubmit() {
    const option = localStorage.getItem("option");
    const username = localStorage.getItem("Username")
    if (option == "Fortnite" || option =="Apex Legends") {
      let platform = localStorage.getItem("Platform");
      async function tracker(ty){
        const trn = new TRN({
          key:process.env.trn
        });
        if (ty == "Apex Legends") {
          if(!platform) platform == "PC"
          if (platform == "PC") platform = "origin"
          else if(platform == "Xbox") platform = "xbl"
          else if(platform == "PSN") platform = platform.toLowerCase()
          else if(platform == "Mobile") {
            alert("Mobile Stats are not supported yet. Please check again later");
            return true;
          }
          let res = trn.ApexLegends({
          username:username,
          platform:platform
        }).then(result => alert(result))
        if(!res) alert("Account Not Found :/");
        return res
        }
        else {
          if(!platform) platform == "PC";
          if (platform == "PC") platform = "kbm";
          else if(platform == "Xbox"|| platform == "PSN") platform = "gamepad";
          else if(platform == "Mobile") platform = "touch";
          console.log(`${platform}, ${username}, ${option}`)
          let res = trn.Fortnite({
          username:username,
          platform:platform
        }).then(result => console.log(result));
        }
      }
      alert(tracker(option))
    }
    else if (option == "Node Package Manager(npm)") {

    }
  }

  render() {
    const { options, platforms, selectedNumber, selectedPlatform, user } = this.state;
    return (
      <div id="root">
         <div className="container">
      <Head>
      <title>Statisfy</title>
      <link rel="icon" href="/yarn.png" />
    </Head>
      <main>
        <Header title="Welcome to Statisfy!" />
      <div>
      <form name="inputs" onSubmit={this.handleFormSubmit} netlify="true">
        Select Statisfy Option<br></br>

        <DropDown
          options={options}
          selectedValue={selectedNumber}
          onChange={this.onOptionsChange}

        /><br></br>
        Choose Platform(If Applicable)<br></br>
        <DropDown
          options={platforms}
          selectedValue={selectedPlatform}
          onChange={this.onPlatformsChange}
          disabled={selectedNumber !== "Apex Legends" && selectedNumber !=="Fortnite" } // this will be disabled if selected value of the first dropdown is 3
        />
            <br></br>  <label>
        Username: <br></br><input name="user" value={user} onChange={this.onUserChange}/>
      </label>
        <button type="submit" disabled={(!selectedNumber)}>Submit</button>
        </form>
        </div>
        </main>
        <Footer />
        </div>
      </div>
    );
  }
}
if (typeof window !== 'undefined') {
reactDom.render(<App />, document.getElementById('root'));
}
export default App;
/*


import {useEffect} from "react";

import { useRouter } from "next/router";
import Link from "next/link";
import {useSelect} from 'downshift';
export default function Home() {
  const options = [
    "Twitter",
    "Twitch",
    "Npm",
    "Github",
    "Spotify",
    "TRN"
  ]
    const {
      isOpen,
      selectedItem,
      getToggleButtonProps,
      getLabelProps,
      getMenuProps,
      highlightedIndex,
      getItemProps,
    } = useSelect({
      options,
      selectedItem: null,
      onSelectedItemChange: ({ selectedItem }) => {
        alert(`You have selected ${selectedItem}`)
      },
    })
    const menuStyles = {
      maxHeight: 80,
      maxWidth: 300,
      overflowY: 'scroll',
      backgroundColor: '#eee',
      padding: 0,
      listStyle: 'none',
      position: 'relative',
    }

    return (
      <div className="container">
      <Head>
      <title>Statisfy</title>
      <link rel="icon" href="/yarn.png" />
    </Head>
      <main>
        <Header title="Welcome to Statisfy!" />
      <div>
        <label {...getLabelProps()}>Choose a platform:</label>
        <button type="button" {...getToggleButtonProps()}>{selectedItem || 'Platform'}</button>
        <ul {...getMenuProps()} style={menuStyles}>
          {isOpen &&
            items.map((item, index) => (
              <li
                style={
                  highlightedIndex === index ? {backgroundColor: '#bde4ff'} : {}
                }
                key={`${item}${index}`}
                {...getItemProps({item, index})}
              >
                {item}
              </li>
            ))}
        </ul>
        {/* if you Tab from menu, focus goes on button, and it shouldn't. only happens here. }
        <div tabIndex="0" />
      </div>
      </main>,
      <Footer />
      </div>
    )
  }
*/