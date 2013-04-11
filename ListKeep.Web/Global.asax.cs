using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.SessionState;

namespace ListKeep.Web
{
    public class Global : System.Web.HttpApplication
    {

        protected void Application_BeginRequest(object sender, EventArgs e)
        {
            //
            // TODO: move to Application startup
            //
            string dbPath = Server.MapPath(@"~\App_Data\db.s3db");
            ListKeep.Lib.EntityBase.DatabaseFilePath = dbPath;
            /*
            Response.Write("URL: " + Request.Url);
            Response.Write("<br/>URL: " + Request.Url.AbsolutePath);
            if (Request.Url.Equals("") || 
                Request.Url.AbsolutePath.Equals("/default.aspx") || 
                Request.Url.AbsolutePath.Equals("/"))
            {
                Server.Transfer("/index.html");
            }
            */
        }

    }
}