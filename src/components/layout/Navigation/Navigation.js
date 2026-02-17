import React, { useState } from 'react';
import './Navigation.css';
import { navigationData } from '../../data/navigation';

function Navigation({setPagina}) {
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  const openSubmenu = (index) => {
    setActiveSubmenu(index);
  };

  const closeAllSubmenus = () => {
    setActiveSubmenu(null);
  };

  return (
    <nav onMouseLeave={closeAllSubmenus}>
      <ul>
        {navigationData.map((item, index) => (
          <li key={index} onMouseEnter={() => openSubmenu(index)} onClick={()=> setActiveSubmenu=== index ? null: index}>
            <a href={item.href} className={item.active ? 'active' : ''}
            onClick={(e) =>{
              if(item.submenu){
                e.preventDefault();
                setActiveSubmenu(activeSubmenu===index ? null: index)
              }else{
                e.preventDefault();
                const pagina= item.href.replace('#', '')
                setPagina(pagina);
              }
            }}
            
            >
              {item.title}
            </a>
            {item.submenu && (
              <ul className={`submenu ${activeSubmenu === index ? 'active' : ''}`}>
                {item.submenu.map((subitem, subIndex) => (
                  <li key={subIndex}>
                    <a href={subitem.href}
                    onClick={(e)=>{
                      e.preventDefault();
                      const pagina = subitem.href.replace('#','')
                      setPagina(pagina)
                    }}
                    >{subitem.title}</a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navigation;