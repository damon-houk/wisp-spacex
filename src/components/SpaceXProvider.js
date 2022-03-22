import * as React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const SpaceXContext = React.createContext(undefined);

export const STATUS_INIT = 'INIT';
export const STATUS_FETCHING = 'FETCHING';
export const STATUS_ERROR = 'ERROR';
export const STATUS_SUCCESS = 'SUCCESS';

const SpaceXProvider = ({ spaceXAPIURL, children }) => {
  const [launches, setLaunches] = React.useState(undefined);
  const [status, setStatus] = React.useState(STATUS_INIT);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [limit, setLimit] = React.useState(10);
  const [totalLaunches, setTotalLaunches] = React.useState(10);
  const [totalPages, setTotalPages] = React.useState(10);


    React.useEffect(
        () => {
            const getAllLaunches = async () => {
                setStatus(STATUS_FETCHING);
                axios.post('https://api.spacexdata.com/v4/launches/query', {
                    options: {
                        pagination: false,
                        populate: [{ path: 'rocket', select: { name: 1 } }],
                        select:
                            {
                                name: 1,
                                flight_number: 1,
                                details: 1,
                                date_utc: 1,
                                links: 1
                            },
                    },
                })
                    .then((response) => {
                        setStatus(STATUS_SUCCESS);
                        console.log(response)
                        setLaunches(response.data.docs);
                        setTotalLaunches(response.data.totalDocs);
                        setTotalPages(response.data.totalPages);
                    }).catch((error) => {
                    if (error.response) {
                        setStatus(STATUS_ERROR);
                    } else if (error.request) {
                        setStatus(STATUS_ERROR);
                    } else {
                        setStatus(STATUS_ERROR);
                    }
                });
            };
            getAllLaunches().then();
        },
        [],
    );

  return (
    <SpaceXContext.Provider value={{
      status, launches, totalLaunches, totalPages, setCurrentPage, setLimit,
    }}
    >
      {children}
    </SpaceXContext.Provider>
  );
}

SpaceXProvider.propTypes = {
  spaceXAPIURL: PropTypes.string,
};

SpaceXProvider.defaultProps = {
  spaceXAPIURL: 'https://api.spacexdata.com/v4',
};

export const useSpaceX = () => {
  const context = React.useContext(SpaceXContext);
  if (context === undefined) {
    throw new Error('Component must be within a SpaceXProvider.');
  }
  return context;
};

export default SpaceXProvider;
