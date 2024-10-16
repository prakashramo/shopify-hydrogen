import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// FilterForm Component
export default function FilterForm() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [filters, setFilters] = useState({
    availability: '',
    minPrice: '',
    maxPrice: ''
  });
  const [sort, setSort] = useState('');
  console.log(sort);
  const queryParams = new URLSearchParams();
  if (sort) queryParams.set('sort', sort);

  // Extract query parameters from URL and set initial filter/sort values
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setFilters({
      availability: params.get('availability') || '',
      minPrice: params.get('minPrice') || '',
      maxPrice: params.get('maxPrice') || ''
    });
    setSort(params.get('sort') || '');
  }, [location.search]);

  // Update query params when filters or sort option changes
  const handleFilterSubmit = (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams();
    
    if (filters.availability) queryParams.set('availability', filters.availability);
    if (filters.minPrice) queryParams.set('minPrice', filters.minPrice);
    if (filters.maxPrice) queryParams.set('maxPrice', filters.maxPrice);
    navigate(`?${queryParams.toString()}`);
  };

   const handleSortChange = (e) => {
    const newSort = e.target.value;
    setSort(newSort);

    // Update the sort query parameter without affecting other filters
    const queryParams = new URLSearchParams(location.search);
    if (newSort) {
      queryParams.set('sort', newSort);
    } else {
      queryParams.delete('sort'); // Remove the sort param if not selected
    }

    navigate(`?${queryParams.toString()}`);
  };

  return (
    <div className="filters-container">
      <form onSubmit={handleFilterSubmit}>
        <div className="filter-section">
          <h4>Availability</h4>
          <label>
            <input
              type="radio"
              value="in_stock"
              checked={filters.availability === 'in_stock'}
              onChange={(e) => setFilters({ ...filters, availability: e.target.value })}
            />
            In stock
          </label>
          <label>
            <input
              type="radio"
              value="out_of_stock"
              checked={filters.availability === 'out_of_stock'}
              onChange={(e) => setFilters({ ...filters, availability: e.target.value })}
            />
            Out of stock
          </label>
        </div>

        <div className="filter-section">
          <h4>Price</h4>
          <label>
            From: 
            <input
              type="number"
              value={filters.minPrice}
              onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
            />
          </label>
          <label>
            To: 
            <input
              type="number"
              value={filters.maxPrice}
              onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
            />
          </label>
        </div>

        <button type="submit">Apply Filters</button>
      </form>

      <div className="sort-section">
        <label htmlFor="sort">Sort by:</label>
        <select
          id="sort"
          value={sort}
          onChange={handleSortChange}
        >
          <option value="alphabetical_asc">Alphabetically, A-Z</option>
          <option value="alphabetical_desc">Alphabetically, Z-A</option>
          <option value="price_asc">Price, Low to High</option>
          <option value="price_desc">Price, High to Low</option>
        </select>
      </div>
    </div>
  );
}
