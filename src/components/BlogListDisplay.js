import React,{useEffect,useState} from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { Card, CardActionArea, CardContent, Divider, Grid, Stack } from '@mui/material';
import {Link} from 'react-router-dom'
import { useBlog } from '../contexts/BlogContext';
function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function createData(name, calories, fat) {
  return { name, calories, fat };
}



export default function BlogListDisplay({blgData}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  let rows = []
  let [blogData,setBlogdata] =useState()
  let [blogDataCount,setBlogdataCount] =useState()
  const {splitEmail,delBlog,writeBlogData,clearArray} = useBlog()
  useEffect(()=>{
    for(let i in blgData){
      blgData[i].blogId = i
      rows.push(blgData[i])
    }

    setBlogdata(rows)
    console.log("data from bdispl",blogData)
    setBlogdataCount(blogDataCount + 1)

    return ()=>{
      clearArray(rows)

     }
  },[blgData])

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  if(blogData !== undefined ){
  return (
    <div style={{width:'70%',margin:"auto"}}>
          <TableContainer component={Paper} elevation={0} >
            <Table sx={{ minWidth: 200}} aria-label="custom pagination table">
              <TableBody>
                {(rowsPerPage > 0
                  ? blogData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : rows
                ).map((row) => (
                  <TableRow key={row.name}>
                    <Card >
                      <Link to='/fullBlogDisplay' state={{
                        blogTitle:row.blogTitle,
                        blogBody:row.blogBody,
                        blogAuthor:row.blogAuthor,
                        blogDate:row.blogDate,
                      }} 
                      style={{color:'black',textDecoration:'none',fontFamily:"cursive"}}
                      >
                        <CardActionArea>
                          <CardContent >
                            <h2 style={{fontFamily:'cursive'}}>
                              {row.blogTitle}
                            </h2>
                            <Divider></Divider>
                            <p style={{textAlign:"left",fontFamily:'cursive'}}>
                              It is a long established fact that a reader will be
                              distracted by the readable content of a page when
                              looking at its layout. The point of using Lorem
                              Ipsum is that it has a more-or-less normal distribution
                              of letters, as opposed to using 'Content here,
                              content here', making it look like readable English.
                              Many desktop publishing packages and web page editor
                              s now use Lorem Ipsum as their 
                            </p>
                          </CardContent>
                        </CardActionArea>
                      </Link>  
                      </Card>
                    
                  </TableRow>
                ))}

                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                    colSpan={3}
                    count={blogData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: {
                        'aria-label': 'rows per page',
                      },
                      native: true,
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
    </div>  
  );
}else{
  return <div><h1>still loading</h1></div>
}

}