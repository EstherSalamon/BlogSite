using BlogSite.Data;
using BlogSite.Web.Views;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BlogSite.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogsController : ControllerBase
    {
        private readonly string _connection;

        public BlogsController(IConfiguration config)
        {
            _connection = config.GetConnectionString("ConStr");   
        }

        [Route("getblogs")]
        [HttpGet]
        public List<Blog> GetBlogsToShowUp()
        {
            BlogsRepository repo = new BlogsRepository(_connection);
            return repo.GetBlogs();
        }

        //[Route("getblogpage")]
        //[HttpGet]
        //public GetBlogsVM GetBlogPage(int pageNum)
        //{
        //    int amtPage = 3;
        //    BlogsRepository repo = new BlogsRepository(_connection);
        //    int total = repo.GetBlogs().Count;
        //    Console.WriteLine(total);
        //    GetBlogsVM vm = new GetBlogsVM
        //    {
        //        Blogs = repo.GetBlogsPage(pageNum, amtPage),
        //        TotalBlogs = total
        //    };

        //    return vm;
        //}

        [Route("addblog")]
        [HttpPost]
        public int LetsPutInANewOne(AddBlogVM vm)
        {
            BlogsRepository repo = new BlogsRepository(_connection);
            int id = repo.AddBlog(vm.Blog);
            return id;
        }

        [Route("addcomment")]
        [HttpPost]
        public void SomeoneCommented(AddCommentVM vm)
        {
            Response.Cookies.Append("last-commenter", vm.Comment.Author);

            BlogsRepository repo = new BlogsRepository(_connection);
            repo.AddComment(vm.Comment);
        }

        [Route("showblog")]
        [HttpGet]
        public ShowBLogVM ToSeeInBig(int blogId)
        {
            BlogsRepository repo = new BlogsRepository(_connection);
            ShowBLogVM vm = new ShowBLogVM
            {
                Blog = repo.GetById(blogId),
                CommenterName = Request.Cookies["last-commenter"]
            };
            return vm;
        }
    }
}
