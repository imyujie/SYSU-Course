# coding=utf-8

import os.path
import tornado.web


class CardModule(tornado.web.UIModule):
	def render(self, item, clickable):
		return self.render_string('modules/card.html',
			item=item,
			clickable=clickable
			)

class CommentModule(tornado.web.UIModule):
	def render(self, rating):
		return self.render_string('modules/comment.html',
			rating=rating
			)

class DropdownModule(tornado.web.UIModule):
	def render(self):
		return self.render_string('modules/dropdown.html')

class FormModule(tornado.web.UIModule):
	def render(self, head):
		return self.render_string('modules/form.html',
			head=head
			)

class HeaderModule(tornado.web.UIModule):
	def render(self, title, subtitle, placeholder):
		return self.render_string('modules/header.html',
			title=title,
			subtitle=subtitle,
			placeholder=placeholder
			)

class LikeModule(tornado.web.UIModule):
	def render(self, like):
		return self.render_string('modules/like.html',
			like=like
			)

class PaginatorModule(tornado.web.UIModule):
	def render(self):
		return self.render_string('modules/paginator.html')

class QuoteModule(tornado.web.UIModule):
	def render(self, comment):
		return self.render_string('modules/quote.html',
			comment=comment
			)


class RatingModule(tornado.web.UIModule):
	def render(self, rating, clickable):
		return self.render_string('modules/rating.html',
			rating=rating,
			clickable=clickable
			)

class SearchModule(tornado.web.UIModule):
	def render(self):
		return self.render_string('modules/search.html',
			)

class StickyModule(tornado.web.UIModule):
	def render(self, catagories):
		return self.render_string('modules/sticky.html',
			catagories=catagories
			)

class TableModule(tornado.web.UIModule):
	def render(self, course):
		return self.render_string('modules/table.html',
			course=course
			)

class PageModule(tornado.web.UIModule):
	def render(self, title, subtitle, placeholder):
		return self.render_string('modules/page.html',
			title=title,
			subtitle=subtitle,
			placeholder=placeholder,
			)

modules = {
	'Card': CardModule,
	'Comment': CommentModule,
	'Dropdown': DropdownModule,
	'Form': FormModule,
	'Like': LikeModule,
    'Header': HeaderModule,
    'Page': PageModule,
    'Paginator': PaginatorModule,
    'Quote': QuoteModule,
    'Rating': RatingModule,
    'Search': SearchModule,
    'Sticky': StickyModule,
    'Table': TableModule
}