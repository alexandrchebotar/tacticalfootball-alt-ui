import React from 'react';
import InfoBar from './components/InfoBar';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Squad from './pages/Squad';

import './App.css';

function App() {
  return (
    <div className="App">
      <InfoBar>
        <div className="header">
            <div className="headerContainer">
                <a href="/"><div className="logo"></div></a>
                <div className="infoBar">
                    $$infoBar
                    <span className="infoBarItem">$7,258,104</span>
                    <span className="infoBarItem">weak 7/14</span>
                    <span className="infoBarItem">season 5</span>
                    <span className="infoBarItem">19:47 04/03/2018</span>
                    <span className="infoBarItem">ArmagedOFF</span>
                    <a href="/"><div className="logout"></div></a>
                </div>
            </div>
        </div>
      </InfoBar>
      <NavBar>
        <div className="sidebar">
            <a href="/"><div className="mainMenu team"></div></a>
            <a href="/"><div className="mainMenu school"></div></a>
            <a href="/"><div className="mainMenu office"></div></a>
            <a href="/"><div className="mainMenu calendar"></div></a>
            <a href="/"><div className="mainMenu statistic"></div></a>
            <a href="/"><div className="mainMenu forum"></div></a>
            <a href="/"><div className="mainMenu help"></div></a>
            <a href="/"><div className="mainMenu settings"></div></a>
        </div>
      </NavBar>
      <Squad>
        <div className="pageMenu">
            $$pageMenu
        </div>
        <div className="content">
            $$content
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Country</th>
                        <th>Status</th>
                        <th>Age</th>
                        <th>Raiting</th>
                        <th>Exp</th>
                        <th>Frm</th>
                        <th>P1</th>
                        <th>P2</th>
                        <th>P3</th>
                        <th>P4</th>
                        <th>P5</th>
                        <th>P6</th>
                        <th>P7</th>
                        <th>P8</th>
                        <th>P9</th>
                        <th>P10</th>
                        <th>P11</th>
                        <th>P12</th>
                        <th>P13</th>
                        <th>P14</th>
                        <th>P15</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Cevin Franco</td>
                        <td>Arg</td>
                        <td>+</td>
                        <td>21</td>
                        <td>7/9</td>
                        <td>Good</td>
                        <td>Awe</td>
                        <td>31</td>
                        <td>70</td>
                        <td>71</td>
                        <td>45</td>
                        <td>48</td>
                        <td>42</td>
                        <td>16</td>
                        <td>28</td>
                        <td>80</td>
                        <td>38</td>
                        <td>45</td>
                        <td>47</td>
                        <td>68</td>
                        <td>65</td>
                        <td>33</td>
                    </tr>
                    <tr>
                        <td>Ingvar Strado</td>
                        <td>Arg</td>
                        <td>C</td>
                        <td>30</td>
                        <td>8/8</td>
                        <td>Awe</td>
                        <td>Exe</td>
                        <td>25</td>
                        <td>28</td>
                        <td>78</td>
                        <td>52</td>
                        <td>55</td>
                        <td>58</td>
                        <td>68</td>
                        <td>60</td>
                        <td>88</td>
                        <td>48</td>
                        <td>42</td>
                        <td>40</td>
                        <td>71</td>
                        <td>70</td>
                        <td>63</td>
                    </tr>
                    <tr>
                        <td>Chui Chaves</td>
                        <td>Arg</td>
                        <td></td>
                        <td>25</td>
                        <td>7/8</td>
                        <td>Awe</td>
                        <td>Exe</td>
                        <td>30</td>
                        <td>30</td>
                        <td>32</td>
                        <td>70</td>
                        <td>70</td>
                        <td>78</td>
                        <td>72</td>
                        <td>50</td>
                        <td>51</td>
                        <td>58</td>
                        <td>38</td>
                        <td>30</td>
                        <td>66</td>
                        <td>78</td>
                        <td>62</td>
                    </tr>
                        <tr>
                        <td>Niko Kovach</td>
                        <td>Cro</td>
                        <td></td>
                        <td>22</td>
                        <td>7/9</td>
                        <td>Good</td>
                        <td>Good</td>
                        <td>77</td>
                        <td>33</td>
                        <td>82</td>
                        <td>80</td>
                        <td>57</td>
                        <td>50</td>
                        <td>55</td>
                        <td>88</td>
                        <td>91</td>
                        <td>72</td>
                        <td>22</td>
                        <td>40</td>
                        <td>68</td>
                        <td>78</td>
                        <td>55</td>
                    </tr>
                        <tr>
                        <td>Ars Art</td>
                        <td>Ukr</td>
                        <td></td>
                        <td>28</td>
                        <td>7/7</td>
                        <td>Exe</td>
                        <td>Exe</td>
                        <td>40</td>
                        <td>40</td>
                        <td>40</td>
                        <td>41</td>
                        <td>88</td>
                        <td>82</td>
                        <td>50</td>
                        <td>55</td>
                        <td>85</td>
                        <td>52</td>
                        <td>25</td>
                        <td>28</td>
                        <td>38</td>
                        <td>18</td>
                        <td>78</td>
                    </tr>
                        <tr>
                        <td>Alpha Bravo</td>
                        <td>USA</td>
                        <td></td>
                        <td>28</td>
                        <td>7/8</td>
                        <td>Bri</td>
                        <td>Exe</td>
                        <td>60</td>
                        <td>30</td>
                        <td>60</td>
                        <td>41</td>
                        <td>44</td>
                        <td>24</td>
                        <td>80</td>
                        <td>82</td>
                        <td>38</td>
                        <td>45</td>
                        <td>44</td>
                        <td>28</td>
                        <td>80</td>
                        <td>49</td>
                        <td>90</td>
                    </tr>
                </tbody>
            </table>
        </div>
      </Squad>
      <Footer>
        <div className="footer">
        </div>
      </Footer>
    </div>
  );
}

export default App;
