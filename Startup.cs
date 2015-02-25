using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(ShamaahPOS.Startup))]
namespace ShamaahPOS
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
            //app.MapSignalR();
        }
    }
}
