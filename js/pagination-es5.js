function Pagination(options){
    this.paginationContainer = document.body.querySelector(options.paginationContainer);
    this.page = +options.page || 1;
    this.pageSize = options.pageSize || 10;
    this.pageCount = options.pageCount || 10;
    this.totalNumber = options.totalNumber;
    this.startPage = 0;
    this.endPage = 0;
    this.actualPageCount = this.totalNumber / this.pageSize;
    this.documentFragment = document.createDocumentFragment();
    this.aLink = options.aLink.indexOf("?") >= 0 ? options.aLink + "&" : options.aLink + "?";
    this.paging();
}
Pagination.prototype.paging = function(){
    console.log(this.actualPageCount);
  if(this.actualPageCount <= this.pageCount){
      this.startPage = 1;
      this.endPage = this.actualPageCount;

      this.createPage();

      this.renderPagination();

      return;
  }
  if(this.actualPageCount > this.pageCount){
      var leftEllipsisCriticalValue = this.pageCount - 1;
      var rightEllipsisCriticalValue = this.actualPageCount - this.pageCount + 2;
      console.log("leftEllipsisCriticalValue：" + leftEllipsisCriticalValue);
      console.log("rightEllipsisCriticalValue：" + rightEllipsisCriticalValue);
      if(this.page < leftEllipsisCriticalValue){
          this.startPage = 1;
          this.endPage = leftEllipsisCriticalValue - 1;

          this.createPage();

          this.createRightEllipsisElement();
          this.createLastPageElement();

          this.renderPagination();

          this.setPageSessionStorage();

          return;
      }
      if(this.page > rightEllipsisCriticalValue){
          this.startPage = rightEllipsisCriticalValue + 1;
          this.endPage = this.actualPageCount;
          this.createFirstPageElement();
          this.createLeftEllipsisElement();

          this.createPage();

          this.renderPagination();

          this.setPageSessionStorage();

          return;
      }
      if(this.page >= leftEllipsisCriticalValue && this.page <= rightEllipsisCriticalValue){
          var startPageInSessionStorage = +sessionStorage.getItem("startPage");
          var endPageInSessionStorage = +sessionStorage.getItem("endPage");
          console.log("startPageInSessionStorage：" + startPageInSessionStorage);
          console.log("endPageInSessionStorage：" + endPageInSessionStorage);
          if(startPageInSessionStorage && endPageInSessionStorage){
              if(this.page >= startPageInSessionStorage && this.page <= endPageInSessionStorage){
                  this.startPage = startPageInSessionStorage;
                  this.endPage = endPageInSessionStorage;

              }else{
                  if(this.page === startPageInSessionStorage - 1){
                      console.log(11);
                      this.startPage = this.page;
                      this.endPage = this.startPage + this.pageCount - 5;
                  }
                  else if(this.page === endPageInSessionStorage + 1){
                      console.log(22);
                      this.endPage = this.page;
                      this.startPage = this.endPage - this.pageCount + 5;
                  }else{
                      this.startPage = this.page;
                      this.endPage = this.startPage + this.pageCount - 5;
                  }
              }
              this.createFirstPageElement();
              this.createLeftEllipsisElement();

              this.createPage();

              this.createRightEllipsisElement();
              this.createLastPageElement();

              this.setPageSessionStorage();

              this.renderPagination();
          }else{
              this.startPage = this.page;
              this.endPage = this.startPage + this.pageCount - 5;
              this.createFirstPageElement();
              this.createLeftEllipsisElement();

              this.createPage();

              this.createRightEllipsisElement();
              this.createLastPageElement();

              this.setPageSessionStorage();

              this.renderPagination();
          }
      }
  }
};
//第一页
Pagination.prototype.createFirstPageElement = function(){
    var liEl = document.createElement("li");
    var aEl = document.createElement("a");
    var aText = document.createTextNode(1+"");

    aEl.appendChild(aText);
    aEl.setAttribute("href", this.aLink + "page=1");
    aEl.className = "pagination-link";

    liEl.appendChild(aEl);
    liEl.className = "pagination-item";
    this.documentFragment.appendChild(liEl);
};
//左边省略号
Pagination.prototype.createLeftEllipsisElement = function(){
    var liEl = document.createElement("li");
    var aEl = document.createElement("a");
    var aText = document.createTextNode("...");

    aEl.appendChild(aText);

    liEl.appendChild(aEl);
    liEl.className = "pagination-item";

    this.documentFragment.appendChild(liEl);
};
//右边省略号
Pagination.prototype.createRightEllipsisElement = function(){
    var liEl = document.createElement("li");
    var aEl = document.createElement("a");
    var aText = document.createTextNode("...");

    aEl.appendChild(aText);

    liEl.appendChild(aEl);
    liEl.className = "pagination-item";

    this.documentFragment.appendChild(liEl);
};
//最后一页
Pagination.prototype.createLastPageElement = function(){
    var liEl = document.createElement("li");
    var aEl = document.createElement("a");
    var aText = document.createTextNode(this.actualPageCount);

    aEl.appendChild(aText);
    aEl.setAttribute("href", this.aLink + "page=" + this.actualPageCount);
    aEl.className = "pagination-link";

    liEl.appendChild(aEl);
    liEl.className = "pagination-item";

    this.documentFragment.appendChild(liEl);
};
//上一页
Pagination.prototype.createPreviousPage = function(){
    var previousPage = this.page === 1 ? 1 : this.page - 1;
    var aEl = document.createElement("a");
    var aText = document.createTextNode("上一页");

    aEl.setAttribute("href", this.aLink + "page=" + previousPage);
    aEl.appendChild(aText);
    aEl.className = "previous-page";

    this.documentFragment.insertBefore(aEl, this.documentFragment.childNodes[0]);
};
//下一页
Pagination.prototype.createNextPage = function(){
    var nextPage = this.page === this.actualPageCount ? this.actualPageCount : this.page + 1;
    var aEl = document.createElement("a");
    var aText = document.createTextNode("下一页");

    aEl.setAttribute("href", this.aLink + "page=" + nextPage );
    aEl.appendChild(aText);
    aEl.className = "next-page";

    this.documentFragment.appendChild(aEl);
};
Pagination.prototype.createPage = function(){
    for(var i = this.startPage; i <= this.endPage; i++){
        var liEl = document.createElement("li");
        var aEl = document.createElement("a");
        var aText = document.createTextNode(i+"");

        aEl.appendChild(aText);
        aEl.setAttribute("href", this.aLink + "page=" + i);
        aEl.className = "pagination-link";
        if(this.page === i){
            aEl.className = "pagination-link pagination-active";
        }

        liEl.appendChild(aEl);
        liEl.className = "pagination-item";

        this.documentFragment.appendChild(liEl);
    }
};
Pagination.prototype.createTotalNumber = function(){
    var pEl = document.createElement("p");
    var spanEl = document.createElement("span");
    var spanTextNode = document.createTextNode(this.totalNumber);

    spanEl.appendChild(spanTextNode);
    pEl.innerText = "总数：";
    pEl.appendChild(spanEl);
    pEl.className = "total-number";

    this.documentFragment.appendChild(pEl);
};
Pagination.prototype.setPageSessionStorage = function(){
    sessionStorage.setItem("startPage", this.startPage);
    sessionStorage.setItem("endPage", this.endPage);
};
Pagination.prototype.clearPageSessionStorage = function(){
    sessionStorage.setItem("startPage", "");
    sessionStorage.setItem("endPage", "");
};
//渲染
Pagination.prototype.renderPagination = function(){
    var ulEl = document.createElement("ul");

    ulEl.appendChild(this.documentFragment);
    ulEl.className = "pagination-list";

    this.documentFragment.appendChild(ulEl);
    this.createPreviousPage();
    this.createNextPage();
    this.paginationContainer.innerHTML = '';
    this.paginationContainer.appendChild(this.documentFragment);
};