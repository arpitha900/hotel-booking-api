require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');

const State   = require('../src/models/State');
const City    = require('../src/models/City');
const User    = require('../src/models/User');
const Hotel   = require('../src/models/Hotel');
const Booking = require('../src/models/Booking');

// ── Seed data ──────────────────────────────────────────────────────────────────

const states = [
  { _id: new mongoose.Types.ObjectId('686c77a4dce3bf40a531794c'), name: 'Karnataka',   code: 'KA', country: 'India' },
  { _id: new mongoose.Types.ObjectId('686c77a4dce3bf40a531794d'), name: 'Maharashtra', code: 'MH', country: 'India' },
  { _id: new mongoose.Types.ObjectId('686c77a4dce3bf40a531794e'), name: 'Tamil Nadu',  code: 'TN', country: 'India' },
];

const cities = [
  { _id: new mongoose.Types.ObjectId('686c77a4dce3bf40a531794f'), name: 'Bengaluru', stateId: states[0]._id },
  { _id: new mongoose.Types.ObjectId('686c77a4dce3bf40a5317950'), name: 'Mysuru',    stateId: states[0]._id },
  { _id: new mongoose.Types.ObjectId('686c77a4dce3bf40a5317951'), name: 'Mumbai',    stateId: states[1]._id },
  { _id: new mongoose.Types.ObjectId('686c77a4dce3bf40a5317952'), name: 'Pune',      stateId: states[1]._id },
  { _id: new mongoose.Types.ObjectId('686c77a4dce3bf40a5317953'), name: 'Chennai',   stateId: states[2]._id },
];

const users = [
  { name: 'Harry Bogan',                email: 'Kara34@gmail.com',                   phone: '(601) 516-7818',       address: '94957 Parkside' },
  { name: 'Paulette Klein',             email: 'Tobin_Metz@yahoo.com',               phone: '1-288-587-9506',       address: '307 Avis Causeway' },
  { name: 'Dr. Elisa Kunze',            email: 'Tyrel86@hotmail.com',                phone: '807-337-3978',         address: "4360 O'Keefe Underpass" },
  { name: 'Brendan Lemke PhD',          email: 'Edwin_Mann62@gmail.com',             phone: '714-934-8274 x920',    address: '42229 N Jefferson Street' },
  { name: 'Esther Feil',                email: 'Kaci44@yahoo.com',                   phone: '1-741-785-2509 x507',  address: '105 Estefania Brooks' },
  { name: 'David Dickens',              email: 'Alexie_Lockman61@yahoo.com',         phone: '471-539-1524 x2724',   address: '9020 York Street' },
  { name: 'Doris Hane',                 email: 'Guido_Beer97@hotmail.com',           phone: '667.924.1971',         address: '33054 Lang Manors' },
  { name: 'Louis Schaden',              email: 'Elsie16@gmail.com',                  phone: '779.435.6940',         address: '948 Shields Locks' },
  { name: 'Cedric Torp-Swaniawski',     email: 'Bryce81@yahoo.com',                  phone: '(592) 678-6061 x79556',address: '24532 Central Avenue' },
  { name: 'Amos Rath',                  email: 'Merle.DAmore84@gmail.com',           phone: '786.664.2822 x82533',  address: '628 Nicolas Fork' },
  { name: 'Norma Wunsch',               email: 'Jamil.Lakin59@hotmail.com',          phone: '(202) 789-5168 x86570',address: '9955 W Maple Street' },
  { name: 'Dr. Maurice Ryan',           email: 'May11@gmail.com',                    phone: '(858) 750-7730 x45040',address: '34098 Prohaska Hollow' },
  { name: 'Georgia Kautzer',            email: 'Kenna_Waters58@hotmail.com',         phone: '(882) 891-9660 x497',  address: '9326 W Main Street' },
  { name: 'Sergio VonRueden',           email: 'Wava_Hand@hotmail.com',              phone: '499.301.1224',         address: '25699 Myrtis Tunnel' },
  { name: 'Maureen Boyer',              email: 'Rafaela.Reichel@hotmail.com',        phone: '1-758-278-0923 x56337',address: '55909 Oak Drive' },
  { name: 'Jacqueline Strosin-Kohler',  email: 'Connie_Pouros@gmail.com',            phone: '509.428.6929 x00887',  address: '96765 Rashawn Forges' },
  { name: 'Gustavo West',               email: 'Jordi_Willms@yahoo.com',             phone: '(212) 355-4123 x309',  address: '667 Emiliano Pass' },
  { name: 'Lena McLaughlin',            email: 'Esta57@yahoo.com',                   phone: '634.516.3939 x5789',   address: '1458 Everett Valleys' },
  { name: 'Paula McLaughlin',           email: 'Michele10@gmail.com',                phone: '516-351-0479 x1251',   address: '9062 Lake Drive' },
  { name: 'Jacquelyn Treutel',          email: 'Otis.Stanton@gmail.com',             phone: '1-736-215-7703 x1784', address: '612 Lodge Close' },
  { name: 'Orville Heaney',             email: 'Hilbert74@yahoo.com',                phone: '(581) 302-8862 x0505', address: '284 Webster Row' },
  { name: 'Oscar Feeney',               email: 'Haylee.Larson22@hotmail.com',        phone: '285.202.2996 x24667',  address: '40827 The Causeway' },
  { name: 'Edith Ruecker',              email: 'Norberto16@hotmail.com',             phone: '(657) 297-2719 x71191',address: '678 W 6th Street' },
  { name: 'Tomas Schneider',            email: 'Kallie72@gmail.com',                 phone: '737-784-3080 x21759',  address: '38680 Ora Mountain' },
  { name: 'Kristi Shanahan',            email: 'Jailyn_Harber7@yahoo.com',           phone: '871.854.9163',         address: '85318 S East Street' },
  { name: 'Emily Sporer',               email: 'Koby.Hegmann78@yahoo.com',           phone: '676-730-8741 x98152',  address: '233 Schimmel Villages' },
  { name: 'Jerry McGlynn',              email: 'Alphonso_Jacobi72@yahoo.com',        phone: '1-512-243-0167',       address: '7064 Koepp Place' },
  { name: 'Jessie Bayer',               email: 'Dylan.Osinski@gmail.com',            phone: '740-371-0104 x78785',  address: '4850 School Close' },
  { name: 'Owen Hyatt',                 email: 'Eliezer.Hermiston7@yahoo.com',       phone: '526.920.6935',         address: '33219 Center Avenue' },
  { name: 'Melanie Adams',              email: 'Frieda_Kiehn@yahoo.com',             phone: '346.813.2086 x2565',   address: '444 Chestnut Grove' },
  { name: "Lorenzo O'Keefe",            email: 'Alex_OHara@gmail.com',               phone: '815.229.5782 x4682',   address: '2878 Miller Summit' },
  { name: 'Janie Batz',                 email: 'Micheal82@yahoo.com',                phone: '997-560-7730 x369',    address: '92696 Connelly Burgs' },
  { name: 'Gregg Nolan I',              email: 'Preston_Hayes36@hotmail.com',        phone: '265.562.7159 x268',    address: '9328 Bridge Street' },
  { name: 'Reginald Simonis',           email: 'Zella.Pagac3@gmail.com',             phone: '330.896.7680 x532',    address: '28795 Johnson Street' },
  { name: 'Carole Dibbert',             email: 'Alexys_Oberbrunner7@gmail.com',      phone: '1-539-370-3900 x89185',address: '2595 Bergstrom Lakes' },
  { name: 'Jeremy Powlowski',           email: 'Ruth_Mann4@gmail.com',               phone: '883-374-0210 x1129',   address: '787 Alexis Point' },
  { name: 'Dawn Kshlerin DVM',          email: 'Isaias.Witting@yahoo.com',           phone: '829.480.4699',         address: '46996 Effertz Heights' },
  { name: 'Dr. Dwayne Pacocha',         email: 'Manuela29@gmail.com',                phone: '940.363.5322 x3545',   address: '9870 N 4th Street' },
  { name: 'Inez VonRueden',             email: 'Madaline_Bins@yahoo.com',            phone: '410-395-2643',         address: '9925 Grange Avenue' },
  { name: 'Dr. Daryl Stroman',          email: 'Eloise_Bartell@gmail.com',           phone: '554.571.6183 x196',    address: '216 Center Street' },
  { name: 'Claudia Hermiston',          email: 'Roma.Rogahn@hotmail.com',            phone: '611-716-0229',         address: '138 Moore Brooks' },
  { name: 'Erika Harvey Sr.',           email: 'Garrett.Jacobson-Krajcik35@yahoo.com',phone: '(949) 653-0148 x94217',address: '11522 Boyle Parkway' },
  { name: 'Ronnie Zemlak',              email: 'Gabe_Buckridge@gmail.com',           phone: '250.303.8072 x80051',  address: '1911 Alysson Port' },
  { name: 'Tasha Wisozk',               email: 'Hector.OHara26@gmail.com',           phone: '1-508-317-3867 x369',  address: '51234 Lawrence Village' },
  { name: 'Jessica Oberbrunner',        email: 'Cecelia74@yahoo.com',                phone: '1-817-887-2165 x4525', address: '8765 Charlene Camp' },
  { name: 'Johanna Zboncak',            email: 'Mervin_Feest@gmail.com',             phone: '818-356-2606',         address: '9388 Okuneva Glen' },
  { name: 'Sabrina Moore',              email: 'Jermain_Price30@yahoo.com',          phone: '1-819-693-2465 x77805',address: '9747 Meadow Close' },
  { name: 'Maureen Vandervort',         email: 'Marcelle.Swaniawski@yahoo.com',      phone: '1-426-988-7936 x01526',address: '7550 Little Glen' },
  { name: 'Iris Jacobs',                email: 'Assunta_Larson@hotmail.com',         phone: '366.768.4276',         address: '70308 Josiah Drive' },
  { name: 'Mr. Joshua Kassulke',        email: 'Guadalupe.Spinka57@gmail.com',       phone: '(681) 255-3127',       address: '977 Collins Courts' },
];

const hotels = [
  { name: 'Ziemann, Mertz and Toy Hotel',          location: 'Station Road',       cityId: cities[2]._id, stateId: states[1]._id, rating: 3, amenities: ['Wifi','Parking','AC'],     pricePerNight: 120, isActive: true  },
  { name: 'Huels, Ankunding and Conroy Hotel',      location: 'Jacobi Shore',       cityId: cities[4]._id, stateId: states[2]._id, rating: 4, amenities: ['Pool','AC','Parking'],     pricePerNight: 185, isActive: false },
  { name: 'Grimes - Runte Hotel',                   location: 'Gutkowski Creek',    cityId: cities[4]._id, stateId: states[2]._id, rating: 2, amenities: ['Wifi','Pool','Parking'],   pricePerNight: 214, isActive: true  },
  { name: 'Bergstrom Inc Hotel',                    location: 'Florian Orchard',    cityId: cities[0]._id, stateId: states[0]._id, rating: 3, amenities: ['Pool','Wifi','Parking'],   pricePerNight: 224, isActive: true  },
  { name: 'MacGyver - Lynch Hotel',                 location: '9th Street',         cityId: cities[4]._id, stateId: states[2]._id, rating: 5, amenities: ['AC','Parking','Wifi'],     pricePerNight: 250, isActive: true  },
  { name: 'Thompson - Feil Hotel',                  location: 'Kingfisher Close',   cityId: cities[4]._id, stateId: states[2]._id, rating: 4, amenities: ['Wifi','Parking','AC'],     pricePerNight: 101, isActive: true  },
  { name: 'Ullrich Group Hotel',                    location: 'Langworth Mission',  cityId: cities[1]._id, stateId: states[0]._id, rating: 3, amenities: ['Pool','Wifi','Parking'],   pricePerNight: 74,  isActive: false },
  { name: 'Crona, Morissette and Brakus Hotel',     location: 'Lucienne Orchard',   cityId: cities[2]._id, stateId: states[1]._id, rating: 4, amenities: ['Wifi','Parking','Pool'],   pricePerNight: 92,  isActive: true  },
  { name: 'Nicolas, Raynor and Wintheiser Hotel',   location: 'Main Street W',      cityId: cities[4]._id, stateId: states[2]._id, rating: 2, amenities: ['Pool','Wifi','AC'],        pricePerNight: 56,  isActive: false },
  { name: 'Parisian - Gerhold Hotel',               location: 'W South Street',     cityId: cities[0]._id, stateId: states[0]._id, rating: 3, amenities: ['Pool','AC','Wifi'],        pricePerNight: 81,  isActive: false },
  { name: 'Tromp Inc Hotel',                        location: 'The Avenue',         cityId: cities[2]._id, stateId: states[1]._id, rating: 4, amenities: ['Pool','Wifi','AC'],        pricePerNight: 229, isActive: true  },
  { name: 'Padberg, Schiller and Kautzer Hotel',    location: 'Ricky Keys',         cityId: cities[4]._id, stateId: states[2]._id, rating: 5, amenities: ['Wifi','Parking','Pool'],   pricePerNight: 109, isActive: true  },
  { name: 'Spinka, Little and Mante Hotel',         location: 'Corkery Gateway',    cityId: cities[1]._id, stateId: states[0]._id, rating: 4, amenities: ['Wifi','Pool','AC'],        pricePerNight: 116, isActive: true  },
  { name: 'Predovic LLC Hotel',                     location: 'Schiller Pines',     cityId: cities[1]._id, stateId: states[0]._id, rating: 3, amenities: ['AC','Pool','Wifi'],        pricePerNight: 254, isActive: true  },
  { name: 'Jenkins - Hirthe Hotel',                 location: 'W 3rd Street',       cityId: cities[1]._id, stateId: states[0]._id, rating: 4, amenities: ['Wifi','Pool','Parking'],   pricePerNight: 189, isActive: true  },
  { name: 'Fisher, Dickens and Dickens Hotel',      location: 'Jalyn Fall',         cityId: cities[2]._id, stateId: states[1]._id, rating: 3, amenities: ['Wifi','Parking','Pool'],   pricePerNight: 189, isActive: false },
  { name: 'Gutkowski - Wiegand Hotel',              location: 'Park Drive',         cityId: cities[2]._id, stateId: states[1]._id, rating: 4, amenities: ['Pool','Parking','Wifi'],   pricePerNight: 183, isActive: false },
  { name: 'Greenholt - Jenkins Hotel',              location: 'Hall Street',        cityId: cities[0]._id, stateId: states[0]._id, rating: 3, amenities: ['Wifi','Pool','AC'],        pricePerNight: 105, isActive: true  },
  { name: 'Feest, Swaniawski and Grimes Hotel',     location: 'Gutkowski Orchard',  cityId: cities[4]._id, stateId: states[2]._id, rating: 2, amenities: ['Parking','AC','Wifi'],     pricePerNight: 239, isActive: false },
  { name: 'Wiza LLC Hotel',                         location: 'Jennyfer Locks',     cityId: cities[4]._id, stateId: states[2]._id, rating: 3, amenities: ['AC','Pool','Parking'],     pricePerNight: 204, isActive: false },
];

// ── Seed runner ────────────────────────────────────────────────────────────────

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Promise.all([
      State.deleteMany({}),
      City.deleteMany({}),
      User.deleteMany({}),
      Hotel.deleteMany({}),
      Booking.deleteMany({}),
    ]);
    console.log('Cleared existing collections');

    // Insert in dependency order
    const insertedStates = await State.insertMany(states);
    console.log(`Inserted ${insertedStates.length} states`);

    const insertedCities = await City.insertMany(cities);
    console.log(`Inserted ${insertedCities.length} cities`);

    const insertedUsers = await User.insertMany(users);
    console.log(`Inserted ${insertedUsers.length} users`);

    const insertedHotels = await Hotel.insertMany(hotels);
    console.log(`Inserted ${insertedHotels.length} hotels`);

    // Seed bookings — distribute across users and hotels
    const activeHotels = insertedHotels.filter((h) => h.isActive);
    const bookingsData = [];
    const usedCombos   = new Set();

    const baseDate = new Date('2025-01-01');

    for (let i = 0; i < 60; i++) {
      const user  = insertedUsers[i % insertedUsers.length];
      const hotel = activeHotels[i % activeHotels.length];
      const comboKey = `${user._id}-${hotel._id}-${i}`;

      if (usedCombos.has(comboKey)) continue;
      usedCombos.add(comboKey);

      const checkIn = new Date(baseDate);
      checkIn.setDate(baseDate.getDate() + i * 3);

      bookingsData.push({
        userId:         user._id,
        hotelId:        hotel._id,
        checkInDate:    checkIn,
        numberOfGuests: (i % 4) + 1,
        status:         i % 4,
        bookingDate:    new Date(),
        specialRequests: i % 5 === 0 ? 'Early check-in requested' : undefined,
      });
    }

    const insertedBookings = await Booking.insertMany(bookingsData);
    console.log(`Inserted ${insertedBookings.length} bookings`);

    console.log('\n✓ Database seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err.message);
    process.exit(1);
  }
};

seed();
