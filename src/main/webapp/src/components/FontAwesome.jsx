import React from 'react';

import { library } from "@fortawesome/fontawesome-svg-core"
import { faInfo } from "@fortawesome/free-solid-svg-icons"
import { faHome } from "@fortawesome/free-solid-svg-icons"
import { faUsers } from "@fortawesome/free-solid-svg-icons"
import { faCartPlus } from "@fortawesome/free-solid-svg-icons"

library.add(faInfo, faHome, faUsers, faCartPlus)

const FontAwesome = () => {
    return (
        <div>
            
        </div>
    );
};

export default FontAwesome;