/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import {
  Typography,
  Grid,
  Box,
  CardActions,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Pagination,
  AvatarGroup,
  Avatar,
  SelectChangeEvent,
} from "@mui/material";
import axios from "axios";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import { BackEndUrl } from "utils/loadEnv";
import { useAuth } from "utils/auth";

interface Blog {
  id: number;
  title: string;
  description: string;
  category: string;
  tags: string;
  user_id: number;
  created_at: string;
  updated_at: string;
  authors: Array<{ name: string; avatar: string }>;
}

const pageSize = 10;

function Author({ authors }: { authors: { name: string; avatar: string }[] }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: 2,
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 1,
          alignItems: "center",
        }}
      >
        <AvatarGroup max={3}>
          {authors.map((author, index) => (
            <Avatar
              key={index}
              alt={author.name}
              src={author.avatar}
              sx={{ width: 24, height: 24 }}
            />
          ))}
        </AvatarGroup>
        <Typography variant="caption">
          {authors.map((author) => author.name).join(", ")}
        </Typography>
      </Box>
      <Typography variant="caption">July 14, 2021</Typography>
    </Box>
  );
}

const Latest: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [focusedCardIndex, setFocusedCardIndex] = useState<number | null>(null);
  const { token } = useAuth();

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const skip = (currentPage - 1) * pageSize;
      const params: any = {
        skip,
        limit: pageSize,
      };
      if (category) {
        params.category = category;
      }
      const response = await axios.get(BackEndUrl + "/blogs", {
        params,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setBlogs(response.data.blogs);
      setTotalBlogs(response.data.total);
    } catch (error) {
      console.error("블로그 데이터를 가져오는데 실패했습니다:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [currentPage, category]);

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    setCategory(event.target.value);
    setCurrentPage(1); // 카테고리 변경 시 페이지를 첫 번째로 리셋
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const handleFocus = (index: number) => {
    setFocusedCardIndex(index);
  };

  const handleBlur = () => {
    setFocusedCardIndex(null);
  };

  const totalPages = Math.ceil(totalBlogs / pageSize);

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h2" gutterBottom>
        게시물
      </Typography>

      {/* 카테고리 필터 */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
        <FormControl variant="outlined" sx={{ minWidth: 200 }}>
          <InputLabel id="category-select-label">카테고리</InputLabel>
          <Select
            labelId="category-select-label"
            id="category-select"
            value={category}
            onChange={handleCategoryChange}
            label="카테고리"
          >
            <MenuItem value="">
              <em>전체</em>
            </MenuItem>
            <MenuItem value="잡담">잡담</MenuItem>
            <MenuItem value="팁">팁</MenuItem>
            <MenuItem value="자랑">자랑</MenuItem>
            {/* 필요한 카테고리를 추가하세요 */}
          </Select>
        </FormControl>
      </Box>

      {/* 로딩 인디케이터 */}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={4}>
          {blogs.map((blog, index) => (
            <Grid item xs={12} md={6} key={blog.id}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: 1,
                  height: "100%",
                }}
                onFocus={() => handleFocus(index)}
                onBlur={handleBlur}
                tabIndex={0}
                className={focusedCardIndex === index ? "Mui-focused" : ""}
              >
                <Typography gutterBottom variant="h5" component="div">
                  {blog.title}
                  <NavigateNextRoundedIcon
                    className="arrow"
                    sx={{ fontSize: "1rem", marginLeft: 1 }}
                  />
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {blog.description}
                </Typography>

                <Author authors={blog.authors} />

                <CardActions>
                  <Button size="small" href={`/blogs/${blog.id}`}>
                    자세히 보기
                  </Button>
                </CardActions>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}

      {/* 페이지네이션 */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default Latest;
