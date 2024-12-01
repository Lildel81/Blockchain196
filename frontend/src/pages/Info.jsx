import React from 'react';

const Info = () => {

    

    return(
       <div
       style = {{
        textAlign: 'center',
        marginTop: '50ptx',
       // background: 'linear-gradient(to bottom, red, blue)',
       background: 'linear-gradient(to bottom, hsla(0, 90%, 50%, 0.6), hsla(240, 60%, 30%, 0.6))',

    
       }}
       >
        {/* title*/}
        <div>
        <strong> <h1 style={{color: 'rgba(0, 0, 80, 1)', fontFamily: 'Georgia', marginTop: '50px', fontSize: '50px' }}>CANDIDATE INFORMATION</h1></strong>
         </div>

        
        {/* CONTAINER for boxes*/}
        <div
        style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: '20px',
            padding: '4%',
        }}>

        {/* paragraph for TRUMP*/}
        <div
        style={{
            width: '45%',                   // Each box takes up roughly half the container's width
            border: '2px solid #333',       // Adds a solid border
           // padding: '25px',                // Adds space inside the box
            borderRadius: '10px',            // Rounds the corners of the box
            //backgroundColor: '#fff',        // Sets a white background for the box
            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.8)), url("https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Republicanlogo.svg/872px-Republicanlogo.svg.png")',
            backgroundPosition: 'center',
            backgroundSize: 'fit',
            padding: '80px',
            boxShadow: '20px 20px 32px rgba(0,0,0,0.5)',
        }}
        >
     <h2 style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',fontSize: '30px', textAlign: 'center', color: '#555' }}>
          <strong>  Donald J. Trump </strong><br /></h2>
         <h3 style={{ fontSize: '20px',  marginBottom: '20px' }}>  <em> Republican Party </em> </h3>
          
          <p style={{ textAlign: 'left', color: '#666' }}>
       <li>   45th President of the United States</li>
              Served from January 2017 to January 2021.
           <li>  Prior Career:</li> 
        Prominent real estate developer. <br />
          Television personality, best known for the reality show "The Apprentice." <br />
          <li>Administration Focus:</li>
          Tax Reform: Implemented significant changes to the tax code aimed at reducing taxes for individuals and businesses.<br />
          Deregulation: Rolled back numerous federal regulations to promote business growth.<br />
          Immigration Control: Enacted stricter immigration policies, including building a border wall.<br />
          International Trade: Renegotiated trade agreements to favor American interests.<br />
          <li>Tenure Highlights:</li>
          Economic Growth: Oversaw periods of substantial economic expansion and low unemployment rates.<br />
          Supreme Court Appointments: Appointed three justices, shifting the court's balance.
          </p>


        </div>

        {/* paragraph for KAMALA*/}
        <div
        style={{
            width: '45%',                   // Each box takes up roughly half the container's width
            border: '2px solid #333',       // Adds a solid border
            padding: '25px',                // Adds space inside the box
            borderRadius: '10px',            // Rounds the corners of the box
           // backgroundColor: '#fff',        // Sets a white background for the box
           backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.8)), url("https://banner2.cleanpng.com/20180914/sov/kisspng-democratic-party-united-states-of-america-politica-1713940652373.webp")',
                   backgroundPosition: 'center',
                   backgroundSize: 'fit',
                   padding: '80px', 
           boxShadow: '20px 20px 32px rgba(0,0,0,0.5)',
        }}
        >
     <h2 style={{textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',color: '#000000', fontSize: '30px', textAlign: 'center', color: '#555' }}>
            <strong>Kamala D. Harris</strong> <br />
          </h2>
          <h3 style={{ fontSize: '20px',  marginBottom: '20px' }}>  <em> Democratic Party </em> </h3>
          <p style={{color: '#000000', textAlign: 'left', color: '#666' }}>
          <li>49th Vice President of the United States</li>
          Serving alongside President Joe Biden since January 2021.<br />
          <li>Historic Achievements:</li>
          First Female Vice President<br />
          Highest-Ranking Female Official in U.S. History<br />
          First African American and Asian American Vice President<br />
          <li>Prior Roles:</li>
          U.S. Senator from California (2017-2021): Focused on issues like criminal justice reform, healthcare, and immigration.<br />
          Attorney General of California (2011-2017): Worked on consumer protection, environmental initiatives, and combating gang violence.<br />
          <li>Policy Priorities:</li>
          Addressing Systemic Racism: Advocates for policies that dismantle institutional racism and promote equality.<br />
          Expanding Healthcare Access: Supports initiatives to make healthcare more affordable and accessible.<br />
                    </p>


        </div>

        </div>



       </div> 
       
    );

};

export default Info;
