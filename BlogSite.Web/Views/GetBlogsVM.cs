using BlogSite.Data;

namespace BlogSite.Web.Views
{
    public class GetBlogsVM
    {
        public List<Blog> Blogs { get; set; }
        public int TotalBlogs { get; set; }
    }
}
