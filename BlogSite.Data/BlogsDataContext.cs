using Microsoft.EntityFrameworkCore;

namespace BlogSite.Data;

public class BlogsDataContext : DbContext
{
    private readonly string _connectionString;

    public BlogsDataContext(string connectionString)
    {
        _connectionString = connectionString;
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer(_connectionString);
    }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        foreach (var relationship in modelBuilder.Model.GetEntityTypes().SelectMany(e => e.GetForeignKeys()))
        {
            relationship.DeleteBehavior = DeleteBehavior.Restrict;
        }
    }

    public DbSet<Blog> Blogs { get; set; }
    public DbSet<Comment> Comments { get; set; }
}