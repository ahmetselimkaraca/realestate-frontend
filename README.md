React - Tailwind + Vite frontend for a mock real estate application.

### Backend repository can be found [here](https://github.com/ahmetselimkaraca/realestate-backend).

Features:

- Listing Creation:
  - Options for price, currency, type and status
  - Adding Location and availability dates (location is used for displaying the listings on a map on the frontend)
  - Image attachment
  - Editing or deleting owned listings

- Listings can be viewed on a React Leaflet map. Locations are inferred from the coordinate fields in the database.
- Admins have a dashboard to view various statistics about the listings. (In progress)
