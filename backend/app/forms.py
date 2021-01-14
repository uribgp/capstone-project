
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, IntegerField
from wtforms.validators import DataRequired, Length, Email, Regexp, EqualTo, NumberRange
from wtforms import ValidationError
from .models import User


class RegistrationForm(FlaskForm):
    class Meta:
        csrf = False

    email = StringField('email', validators=[DataRequired(), Length(1, 64),
                                             Email()])
    username = StringField('username', validators=[
        DataRequired(), Length(1, 64),
        Regexp('^[A-Za-z][A-Za-z0-9_.]*$', 0,
               'Usernames must have only letters, numbers, dots or '
               'underscores')])
    password = PasswordField('password', validators=[
        DataRequired(), EqualTo('password2', message='Passwords must match.')])
    password2 = PasswordField('password2', validators=[DataRequired()])

    def validate_email(self, field):
        if User.query.filter_by(email=field.data.lower()).first():
            raise ValidationError('Email already registered.')

    def validate_username(self, field):
        if User.query.filter_by(username=field.data).first():
            raise ValidationError('Username already in use.')


class UploadVideoForm(FlaskForm):
    class Meta:
        csrf = False

    title = StringField('title', validators=[DataRequired(), Length(1, 64)])
    description = StringField('description', validators=[DataRequired(), Length(1, 64)])
    link = StringField('link', validators=[DataRequired(), Length(1, 64)])
    thumbnail = StringField('title', validators=[DataRequired(), Length(1, 64)])
    main_lift = IntegerField('main_lift', validators=[DataRequired(), NumberRange(min=1, max=4)])
    category_id = IntegerField('category_id', validators=[NumberRange(min=1, max=11)])
