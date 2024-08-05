using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlogSite.Data
{
    public class BlogsRepository
    {
        private readonly string _connection;

        public BlogsRepository(string connection)
        {
            _connection = connection;
        }

        public List<Blog> GetBlogs()
        {
            using var context = new BlogsDataContext(_connection);
            return context.Blogs.OrderByDescending(b => b.DatePosted).ToList();
        }

        public List<Blog> GetBlogsPage(int pageNum, int amtPage)
        {
            int skip = (pageNum - 1) * amtPage;
            List<Blog> blogs = GetBlogs();
            if (skip < 0)
            {
                skip = 0;
            }
            blogs = blogs.GetRange(skip, amtPage);
            return blogs;
        }

        public int AddBlog(Blog b)
        {
            b.DatePosted = DateTime.Now;
            using var context = new BlogsDataContext(_connection);
            context.Blogs.Add(b);
            context.SaveChanges();
            int id = context.Database.ExecuteSqlInterpolated($"INSERT INTO Blogs VALUES {b.Title}, {b.Content}, {b.DatePosted} SELECT SCOPE_IDENTITY()");
            return id;
        }

        public Blog GetById(int id)
        {
            using var context = new BlogsDataContext(_connection);
            return context.Blogs.Include(b => b.Comments).FirstOrDefault(i => i.Id == id);
        }

        public void AddComment(Comment c)
        {
            c.Date = DateTime.Now;
            using var context = new BlogsDataContext(_connection);
            context.Comments.Add(c);
            context.SaveChanges();
        }
    }
}
