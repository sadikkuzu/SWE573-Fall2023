from datetime import datetime
from datetime import timedelta

import jwt
from rest_framework import exceptions


def create_access_token(id):
    token = jwt.encode(
        {
            'user_id': id,
            'exp': datetime.utcnow() + timedelta(seconds=300),
            'iat': datetime.utcnow(),
        },
        'access_secret',
        algorithm='HS256',
    )
    token_decoded = token.decode('utf-8')
    return token_decoded


def decode_access_token(token):
    try:
        payload = jwt.decode(token, 'access_secret', algorithms=['HS256'])
        return payload['user_id']

    except Exception:
        raise exceptions.AuthenticationFailed('unauthenticated')
