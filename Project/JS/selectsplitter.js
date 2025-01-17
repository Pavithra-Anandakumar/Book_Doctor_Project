+function(e) {
    "use strict";
    function t(t) {
        return this.each(function() {
            var l = e(this)
              , s = l.data("selectsplitter")
              , o = "object" == typeof t && t;
            (s || "destroy" != t) && (s || l.data("selectsplitter", s = new r(this,o)),
            "string" == typeof t && s[t]())
        })
    }
    var r = function(e, t) {
        this.init("selectsplitter", e, t)
    };
    r.DEFAULTS = {
        template: '<div class="row" data-selectsplitter-wrapper-selector><div class="col-xs-12 col-sm-6"><select class="form-select" data-selectsplitter-firstselect-selector></select></div> <!-- Add the extra clearfix for only the required viewport --><div class="col-xs-12 col-sm-6"><select class="form-select" data-selectsplitter-secondselect-selector></select></div></div>'
    },
    r.prototype.init = function(t, l, s) {
        var o = this;
        o.type = t,
        o.$element = e(l),
        o.$element.hide(),
        o.options = e.extend({}, r.DEFAULTS, s),
        o.fullCategoryList = {};
        var a = 0
          , n = 0;
        o.$element.find("optgroup").each(function() {
            o.fullCategoryList[e(this).attr("label")] = {};
            var t = e(this)
              , r = 0
              , l = {};
            e(this).find("option").each(function() {
                var t = e(this).attr("value")
                  , s = e(this).text();
                l[e(this).index()] = {
                    x: t,
                    y: s
                },
                r++
            }),
            r > n && (n = r),
            o.fullCategoryList[t.attr("label")] = l,
            a++
        });
        var i = "";
        for (var c in o.fullCategoryList)
            o.fullCategoryList.hasOwnProperty(c) && (i = i + "<option>" + c + "</option>");
        o.$element.after(o.options.template),
        o.$wrapper = o.$element.next("div[data-selectsplitter-wrapper-selector]"),
        o.$firstSelect = e("select[data-selectsplitter-firstselect-selector]", o.$wrapper),
        o.$secondSelect = e("select[data-selectsplitter-secondselect-selector]", o.$wrapper);
        var d = Math.max(a, n, 2);
        d = Math.min(d, 10),
        o.$firstSelect.attr("size", d),
        o.$secondSelect.attr("size", d),
        o.$firstSelect.append(i),
        o.$firstSelect.on("change", e.proxy(o.updateParentCategory, o)),
        o.$secondSelect.on("change", e.proxy(o.updateChildCategory, o)),
        o.$selectedOption = "",
        o.currentParentCategory = "",
        o.currentChildCategory = "",
        o.$element.find("option[selected=selected]").length && (o.$selectedOption = o.$element.find("option[selected=selected]"),
        o.currentParentCategory = o.$selectedOption.closest("optgroup").attr("label"),
        o.currentChildCategory = o.$selectedOption.attr("value"),
        o.$firstSelect.find("option:contains(" + o.currentParentCategory + ")").attr("selected", "selected"),
        o.$firstSelect.trigger("change"))
    }
    ,
    r.prototype.updateParentCategory = function() {
        var e = this;
        e.currentParentCategory = e.$firstSelect.val(),
        e.$secondSelect.empty();
        var t = "";
        for (var r in e.fullCategoryList[e.currentParentCategory])
            e.fullCategoryList[e.currentParentCategory].hasOwnProperty(r) && (t = t + '<option value="' + e.fullCategoryList[e.currentParentCategory][r].x + '">' + e.fullCategoryList[e.currentParentCategory][r].y + "</option>");
        e.$secondSelect.append(t),
        e.$selectedOption && e.$secondSelect.find('option[value="' + e.$selectedOption.attr("value") + '"]').attr("selected", "selected")
    }
    ,
    r.prototype.updateChildCategory = function(t) {
        var r = this;
        r.currentChildCategory = e(t.target).val(),
        r.$element.find("option[selected=selected]").removeAttr("selected"),
        r.$element.find('option[value="' + r.currentChildCategory + '"]').attr("selected", "selected"),
        r.$element.trigger("change"),
        r.$selectedOption = r.$element.find("option[selected=selected]")
    }
    ,
    r.prototype.destroy = function() {
        var e = this;
        e.$wrapper.remove(),
        e.$element.removeData(e.type),
        e.$element.show()
    }
    ,
    e.fn.selectsplitter = t,
    e.fn.selectsplitter.Constructor = r
}(jQuery);
