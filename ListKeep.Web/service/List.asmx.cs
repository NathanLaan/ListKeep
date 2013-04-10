using System;
using System.Collections.Generic;
using System.Web;
using System.Web.Services;
using System.Web.Script.Services;

namespace ListKeep.Web.service
{
    /// <summary>
    /// Summary description for List
    /// </summary>
    [WebService(Namespace = "http://listkeep.net")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    [System.Web.Script.Services.ScriptService]
    public class List : System.Web.Services.WebService
    {

        [WebMethod]
        public string CreateList(string name, string email)
        {
            return Guid.NewGuid().ToString();
        }

    }

}
